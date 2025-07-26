"use client";

import React, { useEffect, useState } from 'react';
import { useNetworkCheck } from '@/core/hooks/useNetworkCheck';
import { METAMASK_NETWORK_CONFIG } from '@/core/config/contracts';

export default function NetworkWarning() {
  const {
    isWrongNetwork,
    isSwitching,
    networkName,
    switchToEtherlink,
    addEtherlinkToWallet,
    showNetworkModal,
    setShowNetworkModal,
  } = useNetworkCheck();

  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until client-side
  if (!isMounted) return null;

  if (!isWrongNetwork) return null;

  return (
    <>
      {/* Network Warning Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black p-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">⚠️</span>
          <span className="font-medium">
            You're not connected to {networkName}. Please switch networks to use Touch Grass.
          </span>
          <button
            onClick={switchToEtherlink}
            disabled={isSwitching}
            className="ml-4 px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {isSwitching ? 'Switching...' : 'Switch Network'}
          </button>
          <button
            onClick={() => setShowNetworkModal(true)}
            className="ml-2 px-4 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
          >
            Add Network
          </button>
        </div>
      </div>

      {/* Network Modal */}
      {showNetworkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Add Etherlink to Your Wallet</h3>
            <p className="text-gray-600 mb-4">
              Your wallet doesn't have the Etherlink network configured. Add it manually:
            </p>

            <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
              <div><strong>Network Name:</strong> {METAMASK_NETWORK_CONFIG.chainName}</div>
              <div><strong>RPC URL:</strong> {METAMASK_NETWORK_CONFIG.rpcUrls[0]}</div>
              <div><strong>Chain ID:</strong> {parseInt(METAMASK_NETWORK_CONFIG.chainId, 16)} (Hex: {METAMASK_NETWORK_CONFIG.chainId})</div>
              <div><strong>Currency Symbol:</strong> {METAMASK_NETWORK_CONFIG.nativeCurrency.symbol}</div>
              <div><strong>Block Explorer:</strong> {METAMASK_NETWORK_CONFIG.blockExplorerUrls[0]}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addEtherlinkToWallet}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 font-medium"
              >
                Add Automatically
              </button>
              <button
                onClick={() => setShowNetworkModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 font-medium"
              >
                Close
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <p><strong>Manual Steps:</strong></p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Open MetaMask settings</li>
                <li>Go to "Networks" → "Add Network"</li>
                <li>Enter the details above</li>
                <li>Save and switch to Etherlink Testnet</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}