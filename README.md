<p align="center">
  <img src="icon.svg" alt="Alby Hub Logo" width="21%">
</p>

# Alby Hub on StartOS

> **Upstream docs:** <https://guides.getalby.com/user-guide/alby-hub>
>
> Everything not listed in this document should behave the same as upstream
> Alby Hub. If a feature, setting, or behavior is not mentioned
> here, the upstream documentation is accurate and fully applicable.

[Alby Hub](https://github.com/getAlby/hub) is a self-custodial Lightning wallet that connects to a Lightning node and provides wallet functionality, Nostr Wallet Connect (NWC), and an app marketplace.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `ghcr.io/getalby/hub` (upstream unmodified) |
| Architectures | x86_64, aarch64 |
| Entrypoint | Default upstream entrypoint |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/data` | Alby Hub data (replaces upstream's `WORK_DIR`) |
| `startos` | (internal) | Contains `store.json` with lightning backend selection |

**Differences from upstream:**

- Upstream default `WORK_DIR` is `$XDG_DATA_HOME/albyhub`
- StartOS mounts the `main` volume directly to `/data`
- StartOS stores backend selection in separate `store.json` file (not in Alby Hub's data directory)

---

## Installation and First-Run Flow

| Step | Upstream (Docker) | StartOS |
|------|-------------------|---------|
| Backend selection | Set `LN_BACKEND_TYPE` env var or use `ENABLE_ADVANCED_SETUP=true` | **Critical task** prompts user to select before first start |
| LND credentials | Manually configure `LND_ADDRESS`, cert, macaroon paths | Auto-configured from LND dependency |
| CLN credentials | Manually configure `CLN_ADDRESS`, `CLN_LIGHTNING_DIR` (gRPC certs) | Auto-configured from Core Lightning dependency |
| phoenixd credentials | Manually configure `PHOENIXD_ADDRESS`, `PHOENIXD_AUTHORIZATION` | Auto-configured from phoenixd dependency (http-password read from its volume) |
| Initial config | `.env` file or environment variables | Managed by StartOS |

**Key difference:** On StartOS, you must complete a mandatory setup task to choose your Lightning backend (LND, Core Lightning, phoenixd, or LDK) before Alby Hub can start. This choice is permanent.

---

## Configuration Management

| Setting | Upstream Method | StartOS Method |
|---------|-----------------|----------------|
| `LN_BACKEND_TYPE` | Env var (LND, LDK, CLN, Phoenixd, Cashu, …) | One-time action (LND, CLN, phoenixd, or LDK only) |
| `LND_ADDRESS` | Env var | Auto-configured: `lnd.startos:10009` |
| `LND_CERT_FILE` | Env var | Auto-configured: `/mnt/lnd/tls.cert` |
| `LND_MACAROON_FILE` | Env var | Auto-configured: `/mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon` |
| `CLN_ADDRESS` | Env var | Auto-configured: `c-lightning.startos:2106` |
| `CLN_LIGHTNING_DIR` | Env var | Auto-configured: `/mnt/cln/bitcoin` (gRPC certs) |
| `PHOENIXD_ADDRESS` | Env var | Auto-configured: `http://phoenixd.startos:9740` |
| `PHOENIXD_AUTHORIZATION` | Env var | Auto-configured: phoenixd's `http-password`, read from `/mnt/phoenixd/phoenix.conf` |
| `ENABLE_ADVANCED_SETUP` | Env var (default: unset) | Set to `false` when using LND, CLN, or phoenixd |
| `HIDE_UPDATE_BANNER` | Env var (default: unset) | Set to `true` |
| `PORT` | Env var (default: 8080) | Fixed at 8080 |
| `WORK_DIR` | Env var | Fixed at `/data` |
| All other settings | Web UI / env vars | Web UI only |

**Environment variables NOT configurable on StartOS:**

- `DATABASE_URI` — uses default SQLite location
- `RELAY` — uses default Nostr relay
- `LDK_*` variables — uses defaults
- `AUTO_UNLOCK_PASSWORD` — not exposed

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Web UI | 8080 | HTTP | Browser-based wallet interface |

**Access methods (StartOS 0.4.0):**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

### Set Lightning Implementation

| Property | Value |
|----------|-------|
| ID | `set-lightning` |
| Name | Set Lightning Implementation |
| Visibility | Hidden (appears only as critical task on first install) |
| Availability | Only when stopped |
| Purpose | Select Lightning backend |

**Options:**

| Option | Description |
|--------|-------------|
| LND on this server | Connects to your StartOS LND installation via gRPC |
| Core Lightning on this server | Connects to your StartOS Core Lightning installation via gRPC |
| phoenixd on this server | Connects to your StartOS phoenixd installation via its HTTP API |
| LDK embedded node | Uses Alby Hub's built-in LDK implementation |

**Note:** Upstream supports several backends (LDK, LND, CLN, Phoenixd, Cashu, …). StartOS exposes LND, Core Lightning, phoenixd, and LDK.

---

## Dependencies

### LND (optional)

| Property | Value |
|----------|-------|
| Version constraint | `>= 0.20.1-beta` |
| Required state | Running |
| Health checks | `lnd`, `sync-progress` |
| Mounted volume | `main` → `/mnt/lnd` (read-only) |
| Purpose | Lightning node backend for wallet operations |

Only required if you select "LND on this server" during setup. Provides the TLS certificate and admin macaroon via the mounted volume.

### Core Lightning (optional)

| Property | Value |
|----------|-------|
| Version constraint | `>= 26.6` |
| Required state | Running |
| Health checks | `lightningd`, `check-synced` |
| Mounted volume | `main` → `/mnt/cln` (read-only) |
| Purpose | Lightning node backend for wallet operations |

Only required if you select "Core Lightning on this server" during setup. Alby Hub connects over the CLN gRPC interface (`c-lightning.startos:2106`), reading the gRPC client certificates from the mounted volume at `/mnt/cln/bitcoin`.

### phoenixd (optional)

| Property | Value |
|----------|-------|
| Version constraint | `>= 0.7.3` |
| Required state | Running |
| Health checks | `primary` |
| Mounted volume | `main` → `/mnt/phoenixd` (read-only) |
| Purpose | Lightning node backend for wallet operations |

Only required if you select "phoenixd on this server" during setup. Alby Hub connects to phoenixd's HTTP API (`http://phoenixd.startos:9740`). phoenixd auto-generates an `http-password` in `phoenix.conf`; the package reads it from the mounted volume (`/mnt/phoenixd/phoenix.conf`) at startup and passes it as `PHOENIXD_AUTHORIZATION`.

---

## Backups and Restore

**Included in backup:**

- `main` volume — Alby Hub data, wallet, database
- `startos` volume — backend selection (`store.json`)

**Restore behavior:**

- Data and backend selection restore normally

---

## Health Checks

| Check | Method | Grace Period |
|-------|--------|--------------|
| Web Interface | Port 8080 listening | Default |

**Messages:**

- Success: "The web interface is ready"
- Error: "The web interface is unreachable"

---

## Limitations and Differences

1. **Subset of upstream backends supported** — StartOS offers LND, Core Lightning, phoenixd, and LDK only; Cashu and other upstream backends are not available
2. **Backend selection is permanent** — cannot switch between LND, Core Lightning, phoenixd, and LDK without reinstalling
3. **Advanced setup disabled for LND/CLN/phoenixd** — `ENABLE_ADVANCED_SETUP=false` is set, preventing backend changes via web UI
4. **No PostgreSQL support** — only embedded SQLite database
5. **No custom node connection** — must use the StartOS LND, Core Lightning, or phoenixd dependency; cannot connect to external nodes
6. **Limited env var configuration** — many upstream environment variables are not exposed (relay, LDK tuning, auto-unlock, etc.)

---

## What Is Unchanged from Upstream

- Web UI functionality and appearance
- Wallet operations (send, receive, manage)
- Channel management (when using LDK)
- Nostr Wallet Connect (NWC) functionality
- App marketplace and connections
- Sub-accounts feature
- All runtime configuration available in web UI

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: albyhub
image: ghcr.io/getalby/hub
architectures: [x86_64, aarch64]
volumes:
  main: /data
  startos: internal (store.json)
ports:
  main: 8080
dependencies:
  - lnd (optional, when LND backend)
  - c-lightning (optional, when CLN backend)
  - phoenixd (optional, when PHOENIX backend)
startos_managed_env_vars:
  - LN_BACKEND_TYPE
  - WORK_DIR
  - HIDE_UPDATE_BANNER
  - LND_ADDRESS (when LND)
  - LND_CERT_FILE (when LND)
  - LND_MACAROON_FILE (when LND)
  - CLN_ADDRESS (when CLN)
  - CLN_LIGHTNING_DIR (when CLN)
  - PHOENIXD_ADDRESS (when PHOENIX)
  - PHOENIXD_AUTHORIZATION (when PHOENIX)
  - ENABLE_ADVANCED_SETUP (when LND, CLN, or PHOENIX)
upstream_env_vars_not_exposed:
  - DATABASE_URI
  - RELAY
  - AUTO_UNLOCK_PASSWORD
  - LDK_* (all LDK tuning vars)
actions:
  - set-lightning (hidden, only-stopped)
health_checks:
  - port_listening: 8080
backup_volumes:
  - main
  - startos
backend_options: [LND, CLN, PHOENIX, LDK]  # upstream supports more: LDK, LND, CLN, Phoenixd, Cashu, …
```
