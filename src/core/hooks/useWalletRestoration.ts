"use client";

import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { sessionUtils } from '@/core/utils/session';

export function useWalletRestoration() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    const restoreWalletConnection = async () => {
      if (isConnected) return; // Already connected

      const session = sessionUtils.getSession();
      if (!session?.connected || !session.address) return; // No session

      setIsRestoring(true);

      try {
        // Try to find and connect to the appropriate connector
        const connector = connectors.find(c =>
          c.name.toLowerCase().includes('metamask') ||
          c.name.toLowerCase().includes('injected')
        );

        if (connector) {
          await connect({ connector });
        }
      } catch (error) {
        console.error('Failed to restore wallet connection:', error);
        // Don't clear session here - let user manually disconnect if needed
      } finally {
        setIsRestoring(false);
      }
    };

    // Small delay to ensure all providers are ready
    const timer = setTimeout(restoreWalletConnection, 1000);
    return () => clearTimeout(timer);
  }, [isConnected, connect, connectors]);

  return { isRestoring };
}