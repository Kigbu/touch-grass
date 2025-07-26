"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { SEQUENCE_CONFIG } from '@/core/config/sequence';

interface SequenceEmbeddedWalletProps {
  onWalletCreated?: (walletAddress: string) => void;
  onClose?: () => void;
}

export default function SequenceEmbeddedWallet({ onWalletCreated, onClose }: SequenceEmbeddedWalletProps) {
  const [step, setStep] = useState<'auth' | 'creating' | 'success'>('auth');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setStep('creating');

    try {
      // TODO: Implement actual Sequence WaaS authentication
      // This is a placeholder for the actual implementation

      // Simulate wallet creation process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate a mock wallet address (in real implementation, this would come from Sequence)
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      setWalletAddress(mockAddress);

      setStep('success');
      toast.success('Wallet created successfully!');

      // Call the callback with the wallet address
      onWalletCreated?.(mockAddress);

    } catch (error) {
      console.error('Error creating wallet:', error);
      toast.error('Failed to create wallet. Please try again.');
      setStep('auth');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestMode = async () => {
    setIsLoading(true);
    setStep('creating');

    try {
      // TODO: Implement guest mode wallet creation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      setWalletAddress(mockAddress);

      setStep('success');
      toast.success('Guest wallet created successfully!');

      onWalletCreated?.(mockAddress);

    } catch (error) {
      console.error('Error creating guest wallet:', error);
      toast.error('Failed to create guest wallet. Please try again.');
      setStep('auth');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Wallet Created Successfully!</h3>
          <p className="text-gray-600 mb-4">
            Your embedded wallet has been created and is ready to use.
          </p>
          <div className="bg-gray-100 p-3 rounded mb-4 text-sm font-mono">
            {walletAddress}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setStep('auth');
                onClose?.();
              }}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 font-medium"
            >
              Continue
            </button>
            <button
              onClick={() => {
                setStep('auth');
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
          <h3 className="text-xl font-bold mb-2">Create Embedded Wallet</h3>
          <p className="text-gray-600">
            Create a secure, non-custodial wallet right in your app. No external sites needed.
          </p>
        </div>

        {step === 'auth' && (
          <div className="space-y-4">
            {/* Email Authentication */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Create Wallet with Email
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Guest Mode */}
            <button
              onClick={handleGuestMode}
              disabled={isLoading}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Continue as Guest
            </button>

            {/* Cancel */}
            <button
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
          </div>
        )}

        {step === 'creating' && (
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <h4 className="font-semibold">Creating Your Wallet...</h4>
            <p className="text-gray-600 text-sm">
              Setting up your secure, non-custodial wallet. This may take a few moments.
            </p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-800 text-sm">
                💡 <strong>Secure:</strong> Your wallet is created using AWS Nitro Enclaves for maximum security
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}