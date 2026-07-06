# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `albyhub`.** Alby Hub is a lightning wallet whose lightning backend is chosen once, permanently, via the `set-lightning` critical setup task (written to `store.json` as `LN_BACKEND_TYPE`). Options: LND, Core Lightning, or phoenixd on this server (StartOS dependencies), or Alby's embedded LDK / Bark nodes (self-contained).
- **Backends are reached over the LXC bridge, not `<pkg>.startos` DNS.** `bridgeAddress` in `startos/utils.ts` resolves a dependency's bridge address reactively from its host id and internal port — mapping `host.bindings[internalPort].net.assignedPort` (the assigned external port), never `addressInfo` hostnames — and `main.ts` chains `.const()` so Alby Hub restarts only when that backend's address actually changes (install / uninstall / re-port), heals automatically if the backend is installed after Alby Hub, and never restarts on backend updates. LND via `gRPCHostId`/`gRPCPort` (from `lnd-startos/startos/interfaces`), phoenixd via `apiHostId` (from `phoenixd-startos/startos/interfaces`) + `port` (from `phoenixd-startos/startos/utils`). Core Lightning's gRPC host is referenced by the literal `'grpc'` because cln exports only its `peer`/`watchtower` ids, with `grpcPort` from `cln-startos/startos/utils`.
- **Only the selected backend's dependency is required at runtime** (`setDependencies` keys off `LN_BACKEND_TYPE`); `setupMain` throws if that backend isn't yet reachable on the internal network.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach albyhub -n albyhub-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `albyhub-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
