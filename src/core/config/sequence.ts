// Sequence Connect Configuration (from Sequence Builder)
export const SEQUENCE_CONFIG = {
  // Your actual keys from Sequence Builder
  projectAccessKey: process.env.NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY || "",
  waasConfigKey: process.env.NEXT_PUBLIC_SEQUENCE_WAAS_CONFIG_KEY || "",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',

  // App configuration
  appName: "Touch Grass",
  projectName: "Touch Grass",

  // UI configuration
  position: "center" as const,
  defaultTheme: "dark" as const,
  enableConfirmationModal: true,

  // Network configuration
  defaultChainId: 128123, // Etherlink Testnet
  chainIds: [1, 10, 40, 41, 56, 97, 100, 137, 1101, 1284, 1287, 1328, 1329, 1868, 1946, 1993, 5031, 6283, 7668, 7672, 8333, 8453, 10143, 11690, 19011, 33111, 33139, 40875, 42161, 42170, 42793, 43113, 43114, 50312, 62850, 80002, 81457, 84532, 128123, 421614, 660279, 11155111, 11155420, 21000000, 37084624, 168587773, 1482601649, 37714555429],

  // Wallet providers
  google: true,
  apple: false,
  coinbase: false,
  metaMask: true,

  // Wagmi configuration
  wagmiConfig: {
    multiInjectedProviderDiscovery: true,
  },
};

// Export the main config
export default SEQUENCE_CONFIG;