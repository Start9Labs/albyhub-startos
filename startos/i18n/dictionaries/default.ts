export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting Alby Hub!': 0,
  'You must select node type before starting Alby Hub': 1,
  'Web Interface': 2,
  'The web interface is ready': 3,
  'The web interface is unreachable': 4,
  'Web UI': 5,
  'The web interface of Alby Hub': 6,
  'Lightning Implementation': 7,
  'Which Lightning node Alby Hub runs on.\n- LND on this server: the LND service on this server, reached over gRPC. Install and start LND first.\n- Core Lightning on this server: the Core Lightning service on this server, reached over gRPC. Install and start Core Lightning first.\n- phoenixd on this server: the phoenixd service on this server, reached over its HTTP API. Install and start phoenixd first.\n- LDK embedded node: Alby Hub runs its own Lightning node inside this service; no other service on this server is needed.\n- Bark embedded Ark wallet (experimental): Alby Hub runs its own Bark wallet, which transacts over the Ark protocol instead of a Lightning node, through Ark and Esplora servers run by Second. Alby Hub marks it as beta.': 8,
  'LND on this server': 9,
  'LDK embedded node': 10,
  'Set Lightning Implementation': 11,
  'Choose which lightning node/implementation Alby Hub will use': 12,
  'This cannot be changed later': 13,
  'Choose your backend lightning implementation': 14,
  'Core Lightning on this server': 15,
  'phoenixd on this server': 16,
  'Could not read the phoenixd http-password': 17,
  'Bark embedded Ark wallet (experimental)': 18,
  'LND is not yet reachable on the internal network. Ensure LND is installed and running.': 19,
  'Core Lightning is not yet reachable on the internal network. Ensure Core Lightning is installed and running.': 20,
  'phoenixd is not yet reachable on the internal network. Ensure phoenixd is installed and running.': 21,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
