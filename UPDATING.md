# Updating the upstream version

## Determining the upstream version

- [getAlby/hub](https://github.com/getAlby/hub) — list tags rather than relying on GitHub's latest release, which can lag behind published images:

  ```
  gh api 'repos/getAlby/hub/tags?per_page=100' --jq '.[].name'
  ```

  Skip prereleases and choose the newest stable tag whose image resolves for both amd64 and arm64:

  ```
  docker manifest inspect ghcr.io/getalby/hub:v<version>
  ```

  Current pin: `dockerTag` in `startos/manifest/index.ts` (`ghcr.io/getalby/hub:v<version>`).
  If a tag has no GitHub release notes, use the comparison with the previous pin for release-note highlights.

## Applying the bump

- Bump `dockerTag` in `startos/manifest/index.ts` to `ghcr.io/getalby/hub:v<new version>`.
- Update `startos/versions/current.ts` and localized release notes. Preserve any outgoing migration in its own version file and register it in `startos/versions/index.ts`, as described in the packaging guide.
