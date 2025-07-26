// Etherlink Network Configuration
export const ETHERLINK_CONFIG = {
  // Etherlink Testnet (for development/hackathon)
  testnet: {
    chainId: 128123,
    name: "Etherlink Testnet",
    nativeCurrency: {
      name: "Tezos",
      symbol: "XTZ",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://node.ghostnet.teztnets.xyz"],
      },
      public: {
        http: ["https://node.ghostnet.teztnets.xyz"],
      },
    },
    blockExplorers: {
      default: {
        name: "Etherlink Explorer",
        url: "https://testnet-explorer.etherlink.com",
      },
    },
  },
  // Etherlink Mainnet (for production)
  mainnet: {
    chainId: 42793, // Update this with actual mainnet chainId
    name: "Etherlink Mainnet",
    nativeCurrency: {
      name: "Tezos",
      symbol: "XTZ",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://mainnet-rpc.etherlink.com"], // Update with actual mainnet RPC
      },
      public: {
        http: ["https://mainnet-rpc.etherlink.com"], // Update with actual mainnet RPC
      },
    },
    blockExplorers: {
      default: {
        name: "Etherlink Explorer",
        url: "https://explorer.etherlink.com",
      },
    },
  },
};

// Use testnet for hackathon development
export const CURRENT_NETWORK = ETHERLINK_CONFIG.testnet;

// Contract addresses (you'll need to deploy these or get them from your dev)
export const CONTRACT_ADDRESSES = {
  PLAN_MANAGER: process.env.NEXT_PUBLIC_PLAN_MANAGER_ADDRESS || "0x...", // Replace with actual address
  MEMORY_NFT: process.env.NEXT_PUBLIC_MEMORY_NFT_ADDRESS || "0x...", // Replace with actual address
  EAS: process.env.NEXT_PUBLIC_EAS_ADDRESS || "0x...", // Ethereum Attestation Service address
};

// Contract ABIs (simplified versions - you'll need the full ABIs from your dev)
export const PLAN_MANAGER_ABI = [
  "function createPlan(address[] calldata invitees) external returns (uint256 planId)",
  "function acceptPlan(uint256 planId) external",
  "function plans(uint256 planId) external view returns (address creator, address[] memory invitees, mapping(address => bool) accepted, bool memoryCreated)",
  "function isHomie(address user, address friend) external view returns (bool)",
  "event PlanCreated(uint256 indexed planId, address indexed creator, address[] invitees)",
  "event PlanAccepted(uint256 indexed planId, address indexed homie)",
];

export const MEMORY_NFT_ABI = [
  "function createMemory(uint256 planId, string calldata ipfsHash) external",
  "function mintMemory(uint256 planId) external",
  "function tokenCounter() external view returns (uint256)",
  "function memories(uint256 planId) external view returns (uint256 planId, string memory ipfsHash)",
];

// Supported wallets for Etherlink
export const SUPPORTED_WALLETS = [
  {
    name: "MetaMask",
    description: "Most popular Ethereum wallet",
    icon: "🦊",
    supported: true,
  },
  {
    name: "Temple Wallet",
    description: "Tezos ecosystem wallet",
    icon: "🏛️",
    supported: true,
  },
  {
    name: "Sequence",
    description: "Universal wallet with Etherlink support",
    icon: "🔗",
    supported: true,
  },
  {
    name: "Phantom",
    description: "Solana wallet (limited Etherlink support)",
    icon: "👻",
    supported: false,
    note: "May need manual network addition",
  },
];

// MetaMask Network Configuration for Etherlink Testnet
export const METAMASK_NETWORK_CONFIG = {
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