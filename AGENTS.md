# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Adding a backend touches five places, and they are not next to each other:** the `LN_BACKEND_TYPE` enum in `startos/fileModels/store.json.ts`, the select values in `startos/actions/setLightning.ts`, the env/mount branch in `startos/main.ts`, the dependency branch in `startos/dependencies.ts`, and the manifest's `dependencies` metadata. Nothing type-checks that you did all five.
- **Resolve a backend's address with `sdk.host.getBridgeAddress`, never `<pkg>.startos` DNS.** The sibling packages export the host id and port to feed it — LND's `gRPCHostId`/`gRPCPort` from `lnd-startos/startos/interfaces`, phoenixd's `apiHostId` from its `interfaces` and `port` from its `utils`. Core Lightning is the exception and is referenced by the literal `'grpc'`, because cln exports only its `peer` and `watchtower` ids. Chaining `.const()` is what keeps a backend update from restarting the wallet.
- **`main` throwing when the backend is unreachable is the design, not a gap.** Don't soften it into a warning or a retry loop: a wallet that starts without its node presents an empty balance, which reads as loss of funds.
- **`store.json` is on the `startos` volume so the application can never see it**, and the action `write`s rather than `merge`s it. Keep both properties if you add a field.
