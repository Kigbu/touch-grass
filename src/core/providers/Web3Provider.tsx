"use client";

import { SequenceConnect, createConfig } from '@0xsequence/connect';
import { WagmiProvider, createConfig as createWagmiConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ReactNode, useState, useEffect } from 'react';
import SEQUENCE_CONFIG from '@/core/config/sequence';
import { CURRENT_NETWORK } from '@/core/config/contracts';

// Create Wagmi chain from our network config
const wagmiChain = {
  id: CURRENT_NETWORK.chainId,
  name: CURRENT_NETWORK.name,
  nativeCurrency: CURRENT_NETWORK.nativeCurrency,
  rpcUrls: CURRENT_NETWORK.rpcUrls,
  blockExplorers: CURRENT_NETWORK.blockExplorers,
  testnet: true
};

// Create Wagmi config for RainbowKit
const wagmiConfig = createWagmiConfig({
  chains: [wagmiChain],
  transports: {
    [wagmiChain.id]: http(),
  },
});

// Create query client for Wagmi
const queryClient = new QueryClient();

// Create Sequence Connect configuration
const sequenceConfig = createConfig('waas', {
  projectAccessKey: SEQUENCE_CONFIG.projectAccessKey,
  position: SEQUENCE_CONFIG.position,
  defaultTheme: SEQUENCE_CONFIG.defaultTheme,
  signIn: {
    projectName: SEQUENCE_CONFIG.projectName,
  },
  defaultChainId: SEQUENCE_CONFIG.defaultChainId,
  chainIds: SEQUENCE_CONFIG.chainIds,
  appName: SEQUENCE_CONFIG.appName,
  waasConfigKey: SEQUENCE_CONFIG.waasConfigKey,
  google: false,
  apple: false,
  walletConnect: false,
  coinbase: false,
  metaMask: true,
  wagmiConfig: SEQUENCE_CONFIG.wagmiConfig,
  enableConfirmationModal: SEQUENCE_CONFIG.enableConfirmationModal
});

interface Web3ProviderProps {
  children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <SequenceConnect config={sequenceConfig}>
            {children}
          </SequenceConnect>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}