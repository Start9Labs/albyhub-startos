<p align="center">
  <img src="icon.svg" alt="Alby Hub Logo" width="21%">
</p>

# Alby Hub on StartOS

> Everything not listed in this document should behave the same as upstream
> Alby Hub. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Alby Hub](https://github.com/getAlby/hub) is a self-custodial Lightning wallet with Nostr Wallet Connect and an app marketplace. On StartOS its Lightning backend is chosen once at install — either a node already running on this server, or one of Alby Hub's own embedded nodes — and every address and credential for an on-server backend is resolved by the package rather than typed in.

- **Upstream repo:** <https://github.com/getAlby/hub>
- **Wrapper repo:** <https://github.com/Start9Labs/albyhub-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The upstream image is used unmodified, with its own entrypoint, and one subcontainer runs the whole service.

| Property      | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Image         | `ghcr.io/getalby/hub`                                            |
| Architectures | x86_64, aarch64                                                  |
| Entrypoint    | Upstream default, run as the container's init process            |
| Subcontainer  | `albyhub-sub` — the `primary` daemon, and the one to `attach` to |

## Volume and Data Layout

Two volumes, and one of them never enters the container. Depending on the chosen backend, a third mount appears — a read-only view of another service's data.

| Volume    | Mount Point   | Purpose                                                                               |
| --------- | ------------- | ------------------------------------------------------------------------------------- |
| `main`    | `/data`       | Alby Hub's working directory: its database, and the embedded LDK or Bark node's state |
| `startos` | — (host side) | `store.json`; never mounted into the container                                        |

| Backend  | Read-only mount | Source                                                   |
| -------- | --------------- | -------------------------------------------------------- |
| LND      | `/mnt/lnd`      | LND's `main` volume — TLS certificate and admin macaroon |
| CLN      | `/mnt/cln`      | Core Lightning's `main` volume                           |
| phoenixd | `/mnt/phoenixd` | phoenixd's `main` volume — `phoenix.conf`                |

The embedded backends mount nothing extra: LDK and Bark keep their state under `/data` like the rest of the wallet.

## File Models

One model, holding one value — the decision everything else in the package is derived from.

| File         | Format | Modelled                | Written by                              |
| ------------ | ------ | ----------------------- | --------------------------------------- |
| `store.json` | JSON   | Yes — `FileHelper.json` | The Set Lightning Implementation action |

`LN_BACKEND_TYPE` is the chosen backend, one of `LND`, `CLN`, `PHOENIX`, `LDK`, or `BARK`. The action **writes** the file rather than merging it, and nothing else in the package touches it. It lives on the `startos` volume so it is never visible to the application, which has no say in it.

**No upstream configuration is written.** Alby Hub is configured entirely by environment, and the package composes that environment fresh on every start rather than persisting it:

| Variable                                            | When               | Value                                                                        |
| --------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| `LN_BACKEND_TYPE`                                   | always             | From `store.json`                                                            |
| `WORK_DIR`                                          | always             | `/data`                                                                      |
| `HIDE_UPDATE_BANNER`                                | always             | `true` — updates come from the registry, not from inside the app             |
| `ENABLE_ADVANCED_SETUP`                             | on-server backends | `false` — the address and credentials are resolved, not entered              |
| `LND_ADDRESS`, `LND_CERT_FILE`, `LND_MACAROON_FILE` | LND                | Bridge address, plus paths into the read-only LND mount                      |
| `CLN_ADDRESS`, `CLN_LIGHTNING_DIR`                  | CLN                | Bridge address, plus `/mnt/cln/bitcoin`                                      |
| `PHOENIXD_ADDRESS`, `PHOENIXD_AUTHORIZATION`        | phoenixd           | Bridge address, plus the `http-password` read out of `phoenix.conf` at start |

Because the environment is rebuilt each start, a credential the backend rotates is picked up on the next restart with nothing to reconcile. The flip side is that the phoenixd password is read at start time only: if `phoenix.conf` is unreadable, the daemon fails to start rather than starting unauthenticated.

## Dependencies

Which dependency exists at all is decided by the backend choice. Exactly one of the three can be active, and the two embedded backends have none.

| Backend   | Dependency    | Kind      | Health checks required       | Mount                      |
| --------- | ------------- | --------- | ---------------------------- | -------------------------- |
| LND       | `lnd`         | `running` | `lnd`, `sync-progress`       | `/mnt/lnd`, read-only      |
| CLN       | `c-lightning` | `running` | `lightningd`, `check-synced` | `/mnt/cln`, read-only      |
| PHOENIX   | `phoenixd`    | `running` | `primary`                    | `/mnt/phoenixd`, read-only |
| LDK, BARK | none          | —         | —                            | —                          |

The sync checks are required as well as "running", so Alby Hub waits for a node that is up but still catching up.

Addresses are resolved over the local service bridge from each dependency's own host binding rather than by hostname, and `main` holds that resolution in a reactive `const`. So Alby Hub restarts when the backend's address genuinely moves — installed, uninstalled, re-ported — and not when the backend merely updates. If the backend is not reachable when Alby Hub starts, `main` throws with a message naming it rather than starting a wallet that cannot see its node.

## Network Access and Interfaces

One interface, serving the wallet UI. Nothing is exported for dependent services.

| Interface | Id     | Type | Port | Description                |
| --------- | ------ | ---- | ---- | -------------------------- |
| Web UI    | `main` | ui   | 8080 | The Alby Hub web interface |

The port is bound on the `main` MultiHost and is not masked. Note that the interface id is `main`, not `ui`.

## Installation and First-Run Flow

Install itself does almost nothing — it generates no credentials and starts no service. What it does is raise a `critical` task, because the package cannot choose a Lightning backend on your behalf and cannot start without one.

The ordering that matters: **install and start the backend service first**, then make the choice. `main` refuses to start when `LN_BACKEND_TYPE` is unset, and refuses again if the selected backend is not yet reachable on the internal network. Choosing LDK or Bark skips this entirely, since neither has a dependency.

Wallet setup itself — the password, the onboarding flow — happens inside Alby Hub's own UI on first login and is untouched by this package.

## Actions

One action, and it is not user-facing.

### Set Lightning Implementation — hidden

**Not in the Actions list.** It is `visibility: 'hidden'` and reachable only through the task that raises it, so a user is never told to go and find it. It is also `only-stopped`, because the value it writes is read as the service starts.

- **What it changes:** `LN_BACKEND_TYPE` in `store.json`, which in turn decides the package's dependency set, its mounts, and the environment handed to the application.
- **Repeat safety:** effectively one-way. Nothing in the package prevents a second write, but once the task is cleared there is no route to the action in the UI, and a wallet's funds and channel state belong to the backend it was created against — pointing an existing install at a different one does not migrate them.

## Tasks

One task, raised at install, and it blocks the service until you complete it.

| Task                         | Severity   | Raised when | Cleared when    |
| ---------------------------- | ---------- | ----------- | --------------- |
| Set Lightning Implementation | `critical` | At install  | The action runs |

`critical` suspends the ordinary controls, so a fresh install presents only this prompt rather than a start button — the intended experience, not a fault, since starting without a backend could not work.

## Health Checks

One check, on the primary daemon.

| Check                     | Method                 | Grace Period |
| ------------------------- | ---------------------- | ------------ |
| `primary` "Web Interface" | Port 8080 is listening | SDK default  |

It confirms the web server is up, which for an on-server backend also implies the backend was reachable at start — the daemon would not have got this far otherwise. A failure after a period of running therefore points at the application, not at the backend; a failure to start at all is more likely the backend, and the service logs carry the explicit message.

## Backups and Restore

Both volumes are copied wholesale — `sdk.Backups.ofVolumes('main', 'startos')` — with SQLite's transient sidecar files excluded, since capturing a `-wal` or `-shm` alongside its database would restore a torn snapshot rather than a clean one.

- **Included:** Alby Hub's database, app connections and Nostr Wallet Connect settings, the embedded LDK or Bark node's state if one is in use, and the backend choice in `store.json`.
- **Excluded:** `*-journal`, `*-wal`, `*-shm`.
- **Restore:** the backend choice comes back with the wallet, so the package resolves the same dependency as before — which must be installed and running for the service to start. For an on-server backend, the node's own funds and channels are that package's backup, not this one's; only Alby Hub's view of them lives here.

## Limitations and Differences

1. **The backend is chosen once.** The action that sets it is hidden after its task is cleared, and no migration path exists between backends.
2. **On-server backends only — no address field.** LND, Core Lightning, and phoenixd are reached at addresses the package resolves from the local dependency; upstream's advanced setup, where a remote node's address and credentials are typed in, is switched off for these backends.
3. **The phoenixd password is read from its config file at start**, so that mount must be readable; there is no way to supply the credential by hand.
4. **The in-app update banner is suppressed.** Updates arrive through the StartOS registry, so upstream's prompt would point at the wrong mechanism.
5. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: albyhub
image: ghcr.io/getalby/hub
architectures:
  - x86_64
  - aarch64
subcontainers:
  - albyhub-sub
volumes:
  main: /data
  startos: host side (store.json)
file_models:
  - store.json # on the startos volume; holds LN_BACKEND_TYPE only
startos_managed_env_vars:
  - LN_BACKEND_TYPE
  - WORK_DIR
  - HIDE_UPDATE_BANNER
  - ENABLE_ADVANCED_SETUP # on-server backends only
  - LND_ADDRESS # LND only
  - LND_CERT_FILE # LND only
  - LND_MACAROON_FILE # LND only
  - CLN_ADDRESS # CLN only
  - CLN_LIGHTNING_DIR # CLN only
  - PHOENIXD_ADDRESS # phoenixd only
  - PHOENIXD_AUTHORIZATION # phoenixd only
dependencies: # exactly one, decided by LN_BACKEND_TYPE; none for LDK or BARK
  - lnd
  - c-lightning
  - phoenixd
interfaces:
  main: { type: ui, port: 8080 }
actions:
  - set-lightning # hidden; raised by task only
tasks:
  - { action: set-lightning, severity: critical }
health_checks:
  - primary # the daemon's ready check, displayed "Web Interface"
```
