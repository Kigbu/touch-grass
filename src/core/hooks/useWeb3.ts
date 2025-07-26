"use client";

import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESSES, PLAN_MANAGER_ABI, MEMORY_NFT_ABI } from '@/core/config/contracts';
import { useState } from 'react';

export function usePlanManager() {
  const { address } = useAccount();

  // Create a new plan
  const { data: createPlanData, writeContract: createPlan, isPending: isCreatingPlan } = useWriteContract();

  const createPlanFunction = (invitees: `0x${string}`[]) => {
    createPlan({
      address: CONTRACT_ADDRESSES.PLAN_MANAGER as `0x${string}`,
      abi: PLAN_MANAGER_ABI,
      functionName: 'createPlan',
      args: [invitees],
    });
  };

  // Accept a plan
  const { data: acceptPlanData, writeContract: acceptPlan, isPending: isAcceptingPlan } = useWriteContract();

  const acceptPlanFunction = (planId: bigint) => {
    acceptPlan({
      address: CONTRACT_ADDRESSES.PLAN_MANAGER as `0x${string}`,
      abi: PLAN_MANAGER_ABI,
      functionName: 'acceptPlan',
      args: [planId],
    });
  };

  // Check if two addresses are friends
  const { data: isHomie } = useReadContract({
    address: CONTRACT_ADDRESSES.PLAN_MANAGER as `0x${string}`,
    abi: PLAN_MANAGER_ABI,
    functionName: 'isHomie',
    args: address ? [address, address] : undefined, // You'll need to pass the actual addresses
    query: {
      enabled: !!address,
    },
  });

  return {
    createPlan: createPlanFunction,
    acceptPlan: acceptPlanFunction,
    isCreatingPlan,
    isAcceptingPlan,
    isHomie,
    createPlanData,
    acceptPlanData,
  };
}

export function useMemoryNFT() {
  const { address } = useAccount();

  // Create a memory (upload to IPFS first, then call this)
  const { data: createMemoryData, writeContract: createMemory, isPending: isCreatingMemory } = useWriteContract();

  const createMemoryFunction = (planId: bigint, ipfsHash: string) => {
    createMemory({
      address: CONTRACT_ADDRESSES.MEMORY_NFT as `0x${string}`,
      abi: MEMORY_NFT_ABI,
      functionName: 'createMemory',
      args: [planId, ipfsHash],
    });
  };

  // Mint the memory NFT
  const { data: mintMemoryData, writeContract: mintMemory, isPending: isMintingMemory } = useWriteContract();

  const mintMemoryFunction = (planId: bigint) => {
    mintMemory({
      address: CONTRACT_ADDRESSES.MEMORY_NFT as `0x${string}`,
      abi: MEMORY_NFT_ABI,
      functionName: 'mintMemory',
      args: [planId],
    });
  };

  // Get total tokens minted
  const { data: tokenCounter } = useReadContract({
    address: CONTRACT_ADDRESSES.MEMORY_NFT as `0x${string}`,
    abi: MEMORY_NFT_ABI,
    functionName: 'tokenCounter',
  });

  return {
    createMemory: createMemoryFunction,
    mintMemory: mintMemoryFunction,
    isCreatingMemory,
    isMintingMemory,
    tokenCounter,
    createMemoryData,
    mintMemoryData,
  };
}

export function useWalletConnection() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const connectWallet = async () => {
    setIsConnectingWallet(true);
    // RainbowKit will handle the connection
    setIsConnectingWallet(false);
  };

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    isConnectingWallet,
    connectWallet,
  };
}