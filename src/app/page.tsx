"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useNetworkCheck } from '@/core/hooks/useNetworkCheck';
import { CURRENT_NETWORK } from '@/core/config/contracts';
import { CustomConnectButton } from '@/components/CustomConnectButton';
import { useOpenConnectModal, useWallets } from '@0xsequence/connect';
import { sessionUtils, type WalletSession } from '@/core/utils/session';

export default function Home() {
  const router = useRouter();
  const { isCorrectNetwork, networkName } = useNetworkCheck();
  const { setOpenConnectModal } = useOpenConnectModal();
  const { wallets, setActiveWallet } = useWallets();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    if (isMounted) {
      const existingSession = sessionUtils.getSession();
      if (existingSession?.connected && existingSession.address) {
        // User already has a session, redirect to dashboard
        router.push('/dashboard');
        toast.success(`Welcome back! Connected as ${existingSession.address.slice(0, 6)}...${existingSession.address.slice(-4)}`);
      }
    }
  }, [isMounted, router]);

  // Monitor wallet connections and handle successful connections
  useEffect(() => {
    if (isMounted && wallets.length > 0) {
      const activeWallet = wallets.find(wallet => wallet.isActive);

      if (activeWallet) {
        // Store session data
        const sessionData: WalletSession = {
          connected: true,
          address: activeWallet.address,
          walletId: activeWallet.id,
          walletName: activeWallet.name,
          isEmbedded: activeWallet.isEmbedded,
          signInMethod: activeWallet.signInMethod,
          connectedAt: new Date().toISOString(),
          network: networkName,
          chainId: CURRENT_NETWORK.chainId
        };

        // Save session using utility
        sessionUtils.setSession(sessionData);

        // Show success message
        toast.success(`Wallet connected successfully! ${activeWallet.address.slice(0, 6)}...${activeWallet.address.slice(-4)}`);

        // Redirect to dashboard
        router.push('/dashboard');
      }
    }
  }, [isMounted, wallets, router, networkName]);

  const handleSequenceConnect = async () => {
    try {
      setSubmitting(true);
      // Open the Sequence Connect modal
      setOpenConnectModal(true);
      // toast.info('Opening Sequence Connect...');
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to open Sequence Connect');
    } finally {
      setSubmitting(false);
    }
  };

  // Don't render wallet-dependent content until mounted
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <img className="w-24 h-24 rounded-full mx-auto mb-4" src="/images/brand/logo.svg" alt="Touch Grass" />
          <h1 className="text-3xl font-bold text-black font-inter mb-2">Welcome to Touch Grass</h1>
          <p className="text-gray-600 font-inter">Connect your wallet to continue</p>
        </div>

        {/* Etherlink Network Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
          <div className="text-blue-800 text-sm font-inter">
            <strong>Built on {networkName}</strong>
            <br />
            Fast, fair, and nearly free transactions
          </div>
        </div>

        {/* Sequence Connect Button */}
        <button
          onClick={handleSequenceConnect}
          disabled={submitting}
          className="w-full h-16 px-4 py-3 bg-blue-500 text-white rounded-[10px] inline-flex justify-center items-center gap-3 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium mb-4"
        >
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-500 text-lg">🔗</span>
          </div>
          <div className="text-left">
            <div className="text-white text-lg font-bold font-inter">
              {submitting ? "Opening..." : "Connect with Sequence"}
            </div>
            <div className="text-blue-100 text-sm font-inter">Embedded wallet - no extension needed</div>
          </div>
        </button>

        {/* Divider */}
        {/* <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm font-inter">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div> */}

        {/* Traditional Wallet Connect Button */}
        {/* <div className="mb-4">
          <CustomConnectButton />
        </div> */}

        {/* Supported Wallets Info */}
        {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center text-gray-700 font-inter text-sm">
            <strong>Also Supported:</strong>
            <div className="mt-2 flex justify-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span>🦊</span>
                <span>MetaMask</span>
              </span>
              <span className="flex items-center gap-1">
                <span>🏛️</span>
                <span>Temple</span>
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
