"use client";

import { SequenceConnect, createConfig } from '@0xsequence/connect';
import { WagmiProvider, createConfig as createWagmiConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';
import SEQUENCE_CONFIG from '@/core/config/sequence';
import { CURRENT_NETWORK } from '@/core/config/contracts';

// Create Wagmi config for RainbowKit
const wagmiConfig = createWagmiConfig({
  chains: [CURRENT_NETWORK],
  transports: {
    [CURRENT_NETWORK.id]: http(),
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
  walletConnect: {
    projectId: SEQUENCE_CONFIG.walletConnectProjectId
  },
  coinbase: false,
  metaMask: true,
  wagmiConfig: SEQUENCE_CONFIG.wagmiConfig,
  enableConfirmationModal: SEQUENCE_CONFIG.enableConfirmationModal
});

interface Web3ProviderProps {
  children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
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