<p align="center">
  <img src="icon.png" alt="Alby Hub Logo" width="21%">
</p>

# Alby Hub on StartOS

> **Upstream docs:** <https://github.com/getAlby/hub#readme>
>
> Everything not listed in this document should behave the same as upstream
> Alby Hub v1.21.4. If a feature, setting, or behavior is not mentioned
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
| Image | `ghcr.io/getalby/hub:v1.21.4` (upstream unmodified) |
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
| Initial config | `.env` file or environment variables | Managed by StartOS |

**Key difference:** On StartOS, you must complete a mandatory setup task to choose your Lightning backend (LND or LDK) before Alby Hub can start. This choice is permanent.

---

## Configuration Management

| Setting | Upstream Method | StartOS Method |
|---------|-----------------|----------------|
| `LN_BACKEND_TYPE` | Env var (LND, LDK, Phoenixd, Cashu) | One-time action (LND or LDK only) |
| `LND_ADDRESS` | Env var | Auto-configured: `lnd.startos:10009` |
| `LND_CERT_FILE` | Env var | Auto-configured: `/mnt/lnd/tls.cert` |
| `LND_MACAROON_FILE` | Env var | Auto-configured: `/mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon` |
| `ENABLE_ADVANCED_SETUP` | Env var (default: unset) | Set to `false` when using LND |
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
| LDK embedded node | Uses Alby Hub's built-in LDK implementation |

**Note:** Upstream supports 4 backends (LDK, LND, Phoenixd, Cashu). StartOS only supports LND and LDK.

---

## Dependencies

| Dependency | Required | Purpose |
|------------|----------|---------|
| LND | Optional | Required if you select "LND on this server" |

When LND is selected, StartOS mounts LND's volume read-only at `/mnt/lnd` to provide the TLS certificate and admin macaroon.

---

## Backups and Restore

**Included in backup:**

- `main` volume — Alby Hub data, wallet, database

**Not included:**

- `startos` volume — backend selection (`store.json`)

**Restore behavior:**

- Data restores normally
- You may need to re-select your Lightning backend if `store.json` is missing

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

1. **Only 2 of 4 backends supported** — StartOS offers LND and LDK only; Phoenixd and Cashu backends are not available
2. **Backend selection is permanent** — cannot switch between LND and LDK without reinstalling
3. **Advanced setup disabled for LND** — `ENABLE_ADVANCED_SETUP=false` is set, preventing backend changes via web UI
4. **No PostgreSQL support** — only embedded SQLite database
5. **No custom LND connection** — must use StartOS LND dependency; cannot connect to external LND nodes
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
upstream_version: 1.21.4
image: ghcr.io/getalby/hub:v1.21.4
architectures: [x86_64, aarch64]
volumes:
  main: /data
  startos: internal (store.json)
ports:
  main: 8080
dependencies:
  - lnd (optional)
startos_managed_env_vars:
  - LN_BACKEND_TYPE
  - LND_ADDRESS (when LND)
  - LND_CERT_FILE (when LND)
  - LND_MACAROON_FILE (when LND)
  - ENABLE_ADVANCED_SETUP (when LND)
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
backend_options: [LND, LDK]  # upstream supports: LND, LDK, Phoenixd, Cashu
```
