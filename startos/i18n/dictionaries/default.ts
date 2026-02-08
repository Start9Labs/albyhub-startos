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
  'Choose the Lightning implementation to use with Alby Hub.<br><br><strong>LND on this server</strong>: This option tells Alby Hub to use the LND node installed on this StartOS server. It is the more sovereign and secure option, allowing full control over your node.<br><br><strong>Alby embedded light node</strong>: This option tells Alby Hub to use its own, internal LDK node. This option is convenient but offers less control over your node.': 8,
  'LND on this server': 9,
  'LDK embedded node': 10,
  'Set Lightning Implementation': 11,
  'Choose which lightning node/implementation Alby Hub will use': 12,
  'This cannot be changed later': 13,
  'Choose your backend lightning implementation': 14,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
