<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# Alby Hub for StartOS

[Alby Hub](https://github.com/getAlby/hub) is the open-source, self-custodial Lightning wallet that puts you in control. With an integrated node, it's more than just a wallet—it's your gateway to Bitcoin. Manage channels, run apps, and take charge of your funds, all through one sleek, user-friendly interface. Empower your Bitcoin journey with simplicity and sovereignty.
This repository creates the `s9pk` package that is installed to run `Alby Hub` on [StartOS](https://github.com/Start9Labs/start-os/).

## Dependencies

Prior to building the `albyhub` package, it's essential to configure your build environment for StartOS services. You can find instructions on how to set up the appropriate build environment in the [Developer Docs](https://docs.start9.com/latest/developer-docs/packaging).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [make](https://www.gnu.org/software/make/)
- [start-cli](https://github.com/Start9Labs/start-cli/)

## Cloning

Clone the **Alby Hub** package repository locally.

```
git clone https://github.com/start9labs/albyhub-startos.git
cd albyhub-startos
```

## Building

To build the **Alby Hub** service as a universal package, run the following command:

```
make
```

## Installing (on StartOS)

Before installation, define `host: https://server-name.local` in your `~/.startos/config.yaml` config file then run the following commands to determine successful install:

> :information_source: Change server-name.local to your Start9 server address

```
make install
```

**Tip:** You can also install the `albyhub.s9pk` by sideloading it under the **StartOS > System > Sideload a Service** section.

## Verify Install

Go to your StartOS Services page, select **Alby Hub** and start the service.

**Done!**
