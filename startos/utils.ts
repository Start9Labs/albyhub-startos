import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 8080

/**
 * Resolve a dependency interface's address over the LXC bridge (ipv4), which
 * replaces the old `<pkg>.startos:<port>` DNS. Returns a bare `host:port`, or
 * undefined if the dependency hasn't published the interface yet.
 */
export const bridgeHostPort = (
  effects: T.Effects,
  packageId: string,
  hostId: string,
  interfaceId: string,
  ssl: boolean,
) =>
  sdk.host
    .get(effects, { hostId, packageId }, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === interfaceId)
      const addr =
        iface &&
        iface.addressInfo.filter({
          kind: 'bridge',
          predicate: (h) => h.ssl === ssl && h.metadata.kind === 'ipv4',
        }).hostnames[0]
      return addr ? `${addr.hostname}:${addr.port}` : undefined
    })
    .const()
