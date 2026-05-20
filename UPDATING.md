# Updating the upstream version

## Determining the upstream version

- [getAlby/hub](https://github.com/getAlby/hub) — latest release:

  ```
  gh release view -R getAlby/hub --json tagName -q .tagName
  ```

  Current pin: `dockerTag` in `startos/manifest/index.ts` (`ghcr.io/getalby/hub:v<version>`).

## Applying the bump

- Bump `dockerTag` in `startos/manifest/index.ts` to `ghcr.io/getalby/hub:v<new version>`.
