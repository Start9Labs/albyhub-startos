# Alby Hub

## Documentation

- [Start9 Bitcoin Guides](https://docs.start9.com/bitcoin-guides/) — connecting wallets and dashboards to a Lightning node on StartOS.
- [Alby Hub user guide](https://guides.getalby.com/user-guide/) — upstream guide to the wallet, Nostr Wallet Connect, and the app marketplace.

## What you get on StartOS

- A self-custodial Lightning wallet at the **Web UI** interface, with Nostr Wallet Connect and the Alby app marketplace.
- A one-time choice of backend: the LND, Core Lightning, or phoenixd service running on this StartOS, Alby Hub's bundled LDK light node, or the experimental Bark Ark wallet.

## Getting set up

On install, Alby Hub posts a critical task to pick your Lightning backend. **Your choice is permanent** — it cannot be changed without reinstalling, so think it through before confirming.

1. If you intend to use **LND**, **Core Lightning**, or **phoenixd on this server**, install and start that package first. (If you pick **LDK embedded node** or **Bark embedded Ark wallet** instead, skip this step.)
2. Run the **Choose your backend lightning implementation** task and select one of:
   - **LND on this server** — Alby Hub talks to your StartOS LND node over gRPC. Requires the LND package installed and running.
   - **Core Lightning on this server** — Alby Hub talks to your StartOS Core Lightning node over gRPC. Requires the Core Lightning package installed and running.
   - **phoenixd on this server** — Alby Hub talks to your StartOS phoenixd node over its HTTP API. Requires the phoenixd package installed and running.
   - **LDK embedded node** — Alby Hub runs its own Lightning node inside this service. No other service on this server is needed, but it depends on third-party servers: it reads the blockchain through an Electrum server run by Alby, opens inbound channels through Lightning service providers (LSPs), and with a paid Alby account stores your channel state on a VSS server run by Alby.
   - **Bark embedded Ark wallet (experimental)** — Alby Hub runs its own internal Bark wallet, transacting over the Ark protocol via Ark and Esplora servers hosted by Second. No Lightning node required, but it depends on those third-party servers, and Alby Hub marks it as beta. This is a separate wallet with its own seed — it does not connect to the Bark Wallet service available on StartOS.
3. Start Alby Hub and open the **Web UI** to finish setup. It first asks for a setup code: copy it from the result of the task above, or run the **Show Setup Code** action. Then create your wallet password and complete the in-app onboarding. The same code is asked for if you restore an Alby Hub backup from its setup screen.

## Using Alby Hub

### Web UI

The web interface is where you manage your wallet: send and receive, manage channels (LDK backend), browse and connect Alby apps, and configure Nostr Wallet Connect. Day-to-day use follows upstream Alby Hub exactly.

## Backups and restore

With the **LDK embedded node**, unless your channel state is stored on Alby's VSS server (paid Alby account), a StartOS backup holds a point-in-time copy of your channel state. **Even your most recent backup can be unsafe to start if the channels changed after it was taken** — and StartOS starts Alby Hub again as soon as a backup finishes, so taking one does not freeze the node. Starting stale state can lose funds: a peer can punish a revoked commitment by claiming the whole channel balance.

- For a planned move, stop Alby Hub before taking the final backup, and leave the original stopped permanently.
- Never run two copies of the same node.
- If the original ran after the backup, or you cannot be sure it did not, do not start the restored copy. Recover with your recovery phrase and latest channel backup instead, following [Alby Hub's recovery guide](https://guides.getalby.com/user-guide/alby-hub/backups-and-recover); this force-closes your channels instead of publishing stale state.

If your channel state is on Alby's VSS server, follow that guide's instructions for it.

## Limitations

- Only the **LND**, **Core Lightning**, **phoenixd**, **LDK**, and **Bark** backends are available; other upstream options (Cashu, …) are not offered.
- The LND, Core Lightning, and phoenixd backends connect to your StartOS node only — there is no field for an external node.
- The Bark backend uses Second's public Ark and Esplora servers; custom servers are not configurable.
- The LDK backend reads the blockchain through Alby's Electrum server; a Bitcoin node or Electrum server on this StartOS is not used.
- With the **phoenixd** backend, restart Alby Hub after changing the API password with phoenixd's **Set API Password** so it reads the updated credential.
