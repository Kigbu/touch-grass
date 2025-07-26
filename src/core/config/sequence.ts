// Sequence Wallet Configuration
export const SEQUENCE_CONFIG = {
  // Your app name and description
  appName: 'Touch Grass',
  appDescription: 'Web3 social app for organizing real-life meetups',

  // Default network (Etherlink Testnet)
  defaultNetwork: {
    chainId: 128123,
    name: 'Etherlink Testnet',
    rpcUrl: 'https://node.ghostnet.teztnets.xyz',
  },

  // Sequence project settings (you'll get these from Sequence dashboard)
  projectAccessKey: process.env.NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY || '',

  // Wallet creation options
  walletOptions: {
    // Allow users to create wallets without email
    skipEmailVerification: true,

    // Default wallet settings
    defaultWallet: {
      name: 'Touch Grass Wallet',
      description: 'Your wallet for organizing meetups and minting memories',
    },
  },
};

// Sequence wallet creation URL
export const SEQUENCE_WALLET_URL = 'https://sequence.app';

// Network configuration for Sequence
export const SEQUENCE_NETWORK_CONFIG = {
  chainId: '0x1f47b', // 128123 in hex
  chainName: 'Etherlink Testnet',
  nativeCurrency: {
    name: 'Tezos',
    symbol: 'XTZ',
    decimals: 18,
  },
  rpcUrls: ['https://node.ghostnet.teztnets.xyz'],
  blockExplorerUrls: ['https://testnet-explorer.etherlink.com'],
};