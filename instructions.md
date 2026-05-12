# Alby Hub

## Documentation

- [Alby Hub user guide](https://guides.getalby.com/user-guide/) — upstream guide to the wallet, Nostr Wallet Connect, and the app marketplace.

## What you get on StartOS

- A self-custodial Lightning wallet at the **Web UI** interface, with Nostr Wallet Connect and the Alby app marketplace.
- A one-time choice of Lightning backend: the LND service running on this StartOS, or Alby Hub's bundled LDK light node.

## Getting set up

On install, Alby Hub posts a critical task to pick your Lightning backend. **Your choice is permanent** — it cannot be changed without reinstalling, so think it through before confirming.

1. If you intend to use **LND on this server**, install and start the LND package first. (If you pick **LDK embedded node** instead, skip this step.)
2. Run the **Choose your backend lightning implementation** task and select either:
   - **LND on this server** — Alby Hub talks to your StartOS LND node over gRPC. Requires the LND package installed and running.
   - **LDK embedded node** — Alby Hub runs its own internal LDK node. Convenient, but offers less control than LND.
3. Start Alby Hub and open the **Web UI** to finish setup (create your wallet password and complete the in-app onboarding).

## Using Alby Hub

### Web UI

The web interface is where you manage your wallet: send and receive, manage channels (LDK backend), browse and connect Alby apps, and configure Nostr Wallet Connect. Day-to-day use follows upstream Alby Hub exactly.

## Limitations

- Only the **LND** and **LDK** backends are available; the upstream **Phoenixd** and **Cashu** options are not offered.
- LND backend connects to your StartOS LND only — there is no field for an external LND.
