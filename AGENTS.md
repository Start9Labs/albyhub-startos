# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **Adding a backend touches five places, and they are not next to each other:** the `LN_BACKEND_TYPE` enum in `startos/fileModels/store.json.ts`, the select values in `startos/actions/setLightning.ts`, the env/mount branch in `startos/main.ts`, the dependency branch in `startos/dependencies.ts`, and the manifest's `dependencies` metadata. Nothing type-checks that you did all five.
- **Resolve a backend's address with `sdk.host.getBridgeAddress`, never `<pkg>.startos` DNS.** The sibling packages export the host id and port to feed it — LND's `gRPCHostId`/`gRPCPort` from `lnd-startos/startos/interfaces`, phoenixd's `apiHostId` from its `interfaces` and `port` from its `utils`. Core Lightning is the exception and is referenced by the literal `'grpc'`, because cln exports only its `peer` and `watchtower` ids. Chaining `.const()` is what keeps a backend update from restarting the wallet.
- **`main` throwing when the backend is unreachable is the design, not a gap.** Don't soften it into a warning or a retry loop: a wallet that starts without its node presents an empty balance, which reads as loss of funds.
- **`store.json` is on the `startos` volume so the application can never see it**, and the action `write`s rather than `merge`s it. Keep both properties if you add a field.
