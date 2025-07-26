"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNetworkCheck } from '@/core/hooks/useNetworkCheck';
import { sessionUtils } from '@/core/utils/session';
import { CURRENT_NETWORK } from '@/core/config/contracts';

export default function NetworkWarning() {
  const { isCorrectNetwork, networkName, addEtherlinkToWallet } = useNetworkCheck();
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isWarningDismissed, setIsWarningDismissed] = useState(false);
  const [sessionNetwork, setSessionNetwork] = useState<{ chainId?: number; network?: string; isCorrect: boolean }>({
    chainId: undefined,
    network: undefined,
    isCorrect: false
  });

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check session network
  useEffect(() => {
    if (isMounted) {
      const network = sessionUtils.getCurrentNetwork();
      setSessionNetwork(network);
    }
  }, [isMounted]);

  // Show warning if not on correct network AND not dismissed
  const shouldShowWarning = isMounted &&
    !isWarningDismissed &&
    (!isCorrectNetwork || !sessionNetwork.isCorrect) &&
    sessionNetwork.chainId !== 128123; // Don't show if already on Etherlink Testnet

  if (!isMounted || !shouldShowWarning) {
    return null;
  }

  const handleSwitchNetwork = async () => {
    try {
      await addEtherlinkToWallet();
      toast.success('Network switched successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error switching network:', error);
      toast.error('Failed to switch network. Please try manually.');
    }
  };

  const currentNetwork = sessionNetwork.network || 'Unknown Network';
  const currentChainId = sessionNetwork.chainId || 'Unknown';

  return (
    <>
      {/* Warning Banner */}
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black px-4 py-2 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="font-medium">
              You&apos;re connected to {currentNetwork} (Chain ID: {currentChainId}).
              Please switch to {networkName} for the best experience.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700 transition-colors text-sm font-medium"
            >
              Switch Network
            </button>
            <button
              onClick={() => setIsWarningDismissed(true)}
              className="text-black hover:text-gray-800 transition-colors p-1"
              title="Dismiss warning"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Network Switch Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🌐</div>
              <h3 className="text-xl font-bold mb-2">Switch to {networkName}</h3>
              <p className="text-gray-600">
                You&apos;re currently on {currentNetwork}. Switch to {networkName} to use Touch Grass features.
              </p>
            </div>

            <div className="space-y-4">
              {/* Network Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">About {networkName}</h4>
                <div className="text-blue-700 text-sm space-y-1">
                  <div>• Fast: Sub-second confirmation times (~500ms)</div>
                  <div>• Fair: Permissionless and censorship-resistant</div>
                  <div>• Nearly Free: ~$0.001 per transaction</div>
                  <div>• EVM Compatible: Works with Ethereum tools</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSwitchNetwork}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Switch to {networkName}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>

              {/* Manual Instructions */}
              <div className="text-center">
                <button
                  onClick={() => {
                    const networkConfig = {
                      chainId: `0x${CURRENT_NETWORK.chainId.toString(16)}`,
                      chainName: CURRENT_NETWORK.name,
                      nativeCurrency: CURRENT_NETWORK.nativeCurrency,
                      rpcUrls: [CURRENT_NETWORK.rpcUrls.default.http[0]],
                      blockExplorerUrls: [CURRENT_NETWORK.blockExplorers.default.url]
                    };

                    if (typeof window.ethereum !== 'undefined') {
                      window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [networkConfig]
                      }).then(() => {
                        toast.success('Network added successfully!');
                        setShowModal(false);
                      }).catch((error: any) => {
                        console.error('Error adding network:', error);
                        toast.error('Failed to add network manually');
                      });
                    } else {
                      toast.error('No wallet detected');
                    }
                  }}
                  className="text-blue-500 hover:text-blue-700 text-sm underline"
                >
                  Add {networkName} manually
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}