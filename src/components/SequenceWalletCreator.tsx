"use client";

import React, { useState } from 'react';
import { SEQUENCE_WALLET_URL, SEQUENCE_NETWORK_CONFIG } from '@/core/config/sequence';
import { toast } from 'react-toastify';

interface SequenceWalletCreatorProps {
  onWalletCreated?: () => void;
  onClose?: () => void;
}

export default function SequenceWalletCreator({ onWalletCreated, onClose }: SequenceWalletCreatorProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState<'intro' | 'creating' | 'success'>('intro');

  const createSequenceWallet = async () => {
    setIsCreating(true);
    setStep('creating');

    try {
      // Open Sequence wallet creation in a new window/tab
      const sequenceUrl = `${SEQUENCE_WALLET_URL}/create?network=${SEQUENCE_NETWORK_CONFIG.chainId}&name=Touch%20Grass%20Wallet`;

      const newWindow = window.open(sequenceUrl, '_blank', 'width=400,height=600');

      if (!newWindow) {
        toast.error('Please allow popups to create a Sequence wallet');
        setStep('intro');
        setIsCreating(false);
        return;
      }

      // Listen for wallet creation completion
      const checkWalletCreation = setInterval(() => {
        try {
          // Check if the window is closed (user completed wallet creation)
          if (newWindow.closed) {
            clearInterval(checkWalletCreation);
            setStep('success');
            setIsCreating(false);
            toast.success('Sequence wallet created successfully!');
            onWalletCreated?.();
          }
        } catch (error) {
          // Window might be cross-origin, which is expected
        }
      }, 1000);

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(checkWalletCreation);
        if (!newWindow.closed) {
          newWindow.close();
        }
        if (step === 'creating') {
          setStep('intro');
          setIsCreating(false);
          toast.info('Wallet creation timed out. Please try again.');
        }
      }, 300000); // 5 minutes

    } catch (error) {
      console.error('Error creating Sequence wallet:', error);
      toast.error('Failed to create Sequence wallet. Please try again.');
      setStep('intro');
      setIsCreating(false);
    }
  };

  const openSequenceApp = () => {
    window.open(SEQUENCE_WALLET_URL, '_blank');
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Wallet Created Successfully!</h3>
          <p className="text-gray-600 mb-4">
            Your Sequence wallet has been created. You can now connect it to Touch Grass.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setStep('intro');
                onClose?.();
              }}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 font-medium"
            >
              Connect Wallet
            </button>
            <button
              onClick={() => {
                setStep('intro');
                onClose?.();
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔗</div>
          <h3 className="text-xl font-bold mb-2">Create Sequence Wallet</h3>
          <p className="text-gray-600">
            Create a new wallet to start using Touch Grass. Sequence makes it easy and secure.
          </p>
        </div>

        {step === 'intro' && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Why Sequence?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• No browser extension required</li>
                <li>• Works on any device</li>
                <li>• Built-in security features</li>
                <li>• Easy backup and recovery</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Network Details</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div><strong>Network:</strong> {SEQUENCE_NETWORK_CONFIG.chainName}</div>
                <div><strong>Chain ID:</strong> {parseInt(SEQUENCE_NETWORK_CONFIG.chainId, 16)}</div>
                <div><strong>Currency:</strong> {SEQUENCE_NETWORK_CONFIG.nativeCurrency.symbol}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={createSequenceWallet}
                disabled={isCreating}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isCreating ? 'Creating...' : 'Create Wallet'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 font-medium"
              >
                Cancel
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={openSequenceApp}
                className="text-blue-500 hover:text-blue-600 text-sm underline"
              >
                Already have a Sequence wallet? Open Sequence App
              </button>
            </div>
          </div>
        )}

        {step === 'creating' && (
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <h4 className="font-semibold">Creating Your Wallet...</h4>
            <p className="text-gray-600 text-sm">
              A new window will open to complete wallet creation.
              Please follow the instructions and return here when done.
            </p>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-yellow-800 text-sm">
                💡 <strong>Tip:</strong> Keep this window open while creating your wallet
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}