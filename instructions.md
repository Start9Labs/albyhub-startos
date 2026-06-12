# Alby Hub

## Documentation

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
   - **phoenixd on this server** — Alby Hub talks to your StartOS phoenixd node over its HTTP API. Requires the phoenixd package installed and running. phoenixd is a minimal, automated Lightning node.
   - **LDK embedded node** — Alby Hub runs its own internal LDK node. Convenient, but offers less control than a full node.
   - **Bark embedded Ark wallet (experimental)** — Alby Hub runs its own internal Bark wallet, transacting over the Ark protocol via Ark and Esplora servers hosted by Second. No Lightning node required, but it depends on those third-party servers and is experimental. This is a separate wallet with its own seed — it does not connect to the Bark Wallet service available on StartOS.
3. Start Alby Hub and open the **Web UI** to finish setup (create your wallet password and complete the in-app onboarding).

## Using Alby Hub

### Web UI

The web interface is where you manage your wallet: send and receive, manage channels (LDK backend), browse and connect Alby apps, and configure Nostr Wallet Connect. Day-to-day use follows upstream Alby Hub exactly.

## Limitations

- Only the **LND**, **Core Lightning**, **phoenixd**, **LDK**, and **Bark** backends are available; other upstream options (Cashu, …) are not offered.
- The LND, Core Lightning, and phoenixd backends connect to your StartOS node only — there is no field for an external node.
- The Bark backend uses Second's public Ark and Esplora servers; custom servers are not configurable.
