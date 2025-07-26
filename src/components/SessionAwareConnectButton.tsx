"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { sessionUtils } from '@/core/utils/session';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface SessionAwareConnectButtonProps {
  showDisconnect?: boolean;
}

export default function SessionAwareConnectButton({ showDisconnect = false }: SessionAwareConnectButtonProps) {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [sessionAddress, setSessionAddress] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const session = sessionUtils.getSession();
      if (session?.address) {
        setSessionAddress(session.address);
      }
    }
  }, [isMounted]);

  const handleDisconnect = () => {
    disconnect();
    sessionUtils.clearSession();
    router.push('/');
    toast.success('Disconnected successfully');
  };

  // If connected (either through Wagmi or session)
  if (isMounted && (isConnected || sessionAddress)) {
    const displayAddress = address || sessionAddress;

    // If showDisconnect is true, show disconnect button (for dashboard)

    return (
      <div className="flex items-center gap-2">
        <ConnectButton />


        {showDisconnect && <button
          onClick={handleDisconnect}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>}

      </div>
    );

  }

  // Use the regular ConnectButton for all other cases
  return <ConnectButton />;
}