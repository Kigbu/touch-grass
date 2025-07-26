"use client";

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from 'react';
import { CURRENT_NETWORK } from '@/core/config/contracts';

// Create custom Etherlink chain configuration
const etherlinkChain = {
  id: CURRENT_NETWORK.chainId,
  name: CURRENT_NETWORK.name,
  nativeCurrency: CURRENT_NETWORK.nativeCurrency,
  rpcUrls: CURRENT_NETWORK.rpcUrls,
  blockExplorers: CURRENT_NETWORK.blockExplorers,
} as const;

const config = createConfig({
  chains: [etherlinkChain],
  transports: {
    [etherlinkChain.id]: http(),
  },
});

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}