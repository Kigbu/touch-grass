"use client";

import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { CURRENT_NETWORK, SUPPORTED_WALLETS, METAMASK_NETWORK_CONFIG } from '@/core/config/contracts';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function useNetworkCheck() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [showNetworkModal, setShowNetworkModal] = useState(false);

  const isCorrectNetwork = chainId === CURRENT_NETWORK.chainId;
  const isWrongNetwork = isConnected && !isCorrectNetwork;

  const switchToEtherlink = async () => {
    try {
      await switchChain({ chainId: CURRENT_NETWORK.chainId });
      toast.success(`Switched to ${CURRENT_NETWORK.name}`);
    } catch (error) {
      console.error('Failed to switch network:', error);
      toast.error('Failed to switch network. Please add Etherlink manually.');
      setShowNetworkModal(true);
    }
  };

  const addEtherlinkToWallet = () => {
    // Use the MetaMask-specific network configuration
    const networkData = {
      chainId: METAMASK_NETWORK_CONFIG.chainId,
      chainName: METAMASK_NETWORK_CONFIG.chainName,
      nativeCurrency: METAMASK_NETWORK_CONFIG.nativeCurrency,
      rpcUrls: METAMASK_NETWORK_CONFIG.rpcUrls,
      blockExplorerUrls: METAMASK_NETWORK_CONFIG.blockExplorerUrls,
    };

    // Try to add network to wallet
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkData],
      }).then(() => {
        toast.success('Etherlink network added to your wallet!');
        setShowNetworkModal(false);
      }).catch((error: unknown) => {
        console.error('Failed to add network:', error);
        toast.error('Failed to add network. Please add manually.');
      });
    }
  };

  const getNetworkStatus = () => {
    if (!isConnected) return 'not-connected';
    if (isCorrectNetwork) return 'correct';
    return 'wrong';
  };

  const getSupportedWallets = () => {
    return SUPPORTED_WALLETS.filter(wallet => wallet.supported);
  };

  return {
    isConnected,
    isCorrectNetwork,
    isWrongNetwork,
    isSwitching,
    currentChainId: chainId,
    targetChainId: CURRENT_NETWORK.chainId,
    networkName: CURRENT_NETWORK.name,
    switchToEtherlink,
    addEtherlinkToWallet,
    getNetworkStatus,
    getSupportedWallets,
    showNetworkModal,
    setShowNetworkModal,
  };
}