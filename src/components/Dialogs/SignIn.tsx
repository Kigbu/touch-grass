"use client";

import React from "react";
import { Dialog } from "primereact/dialog";
import TextInput from "../Form/TextInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { toast } from 'react-toastify';
import { useNetworkCheck } from '@/core/hooks/useNetworkCheck';
import { CURRENT_NETWORK, SUPPORTED_WALLETS } from '@/core/config/contracts';
import SequenceWalletCreator from '../SequenceWalletCreator';
import { CustomConnectButton } from "../CustomConnectButton";

interface SignInProps {
  visible: boolean;
  hideDialog: () => void;
}

export default function SignIn({ visible, hideDialog }: SignInProps) {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { isCorrectNetwork, networkName } = useNetworkCheck();

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: "",
    },
  });

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [showWalletOptions, setShowWalletOptions] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [showSequenceCreator, setShowSequenceCreator] = React.useState<boolean>(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setSubmitting(true);
      // TODO: Implement Google OAuth
      toast.info("Google sign-in coming soon!");
    } catch (error) {
      toast.error("Failed to sign in with Google");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWalletConnect = async () => {
    try {
      setShowWalletOptions(true);
    } catch (error) {
      toast.error("Failed to connect wallet");
    }
  };

  const handleCreateSequenceWallet = () => {
    setShowSequenceCreator(true);
    hideDialog();
  };

  const handleSequenceWalletCreated = () => {
    setShowSequenceCreator(false);
    setShowWalletOptions(true);
    toast.success("Now connect your new Sequence wallet!");
  };

  // Close dialog when wallet is connected and on correct network
  React.useEffect(() => {
    if (isMounted && isConnected && isCorrectNetwork && visible) {
      hideDialog();
      setShowWalletOptions(false);
      setShowSequenceCreator(false);
      toast.success(`Welcome! Connected to ${networkName} with ${address?.slice(0, 6)}...${address?.slice(-4)}`);
    }
  }, [isMounted, isConnected, isCorrectNetwork, visible, address, hideDialog, networkName]);

  // Don't render wallet-dependent content until mounted
  if (!isMounted) {
    return (
      <Dialog
        visible={visible}
        onHide={hideDialog}
        className="w-[100vw] md:w-1/3"
        modal={true}
        style={{ margin: 0 }}
        contentStyle={{
          borderRadius: 16,
        }}
        header={() => (
          <div className="text-[#1f1f1f] text-lg font-bold font-instrument-sans leading-[28.80px]">
            Connect to Touch Grass
          </div>
        )}
        dismissableMask
        showHeader={false}
        headerStyle={{ backgroundColor: "#f5f6f5" }}
      >
        <div className="w-full h-max relative bg-white rounded-[20px] overflow-hidden">
          <div className="w-full p-2.5 inline-flex flex-col justify-center items-center gap-2.5">
            <img className="self-stretch h-36 rounded-full" src="/images/brand/logo.svg" />
          </div>
          <div className="w-full h-max inline-flex flex-col justify-start items-center gap-6 pb-6">
            <div className="w-96 flex flex-col justify-start items-center">
              <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-2xl font-bold font-inter">Welcome to Touch Grass</div>
              </div>
              <div className="p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-xl font-normal font-inter">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog
        visible={visible}
        onHide={hideDialog}
        className="w-[100vw] md:w-1/3"
        modal={true}
        style={{ margin: 0 }}
        contentStyle={{
          borderRadius: 16,
        }}
        header={() => (
          <div className="text-[#1f1f1f] text-lg font-bold font-instrument-sans leading-[28.80px]">
            Connect to Touch Grass
          </div>
        )}
        dismissableMask
        showHeader={false}
        headerStyle={{ backgroundColor: "#f5f6f5" }}
      >

        <div className="w-full h-max relative bg-white rounded-[20px] overflow-hidden">
          <div className="w-full p-2.5 inline-flex flex-col justify-center items-center gap-2.5">
            <img className="self-stretch h-36 rounded-full" src="/images/brand/logo.svg" />
          </div>
          <div className="w-full h-max inline-flex flex-col justify-start items-center gap-6 pb-6">
            <div className="w-96 flex flex-col justify-start items-center">
              <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-2xl font-bold font-inter">Welcome to Touch Grass</div>
              </div>
              <div className="p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-xl font-normal font-inter">Connect your wallet to continue</div>
              </div>

              {/* Etherlink Network Info */}
              <div className="mt-2 p-3 bg-blue-50 rounded-lg text-center">
                <div className="text-blue-800 text-sm font-inter">
                  <strong>Built on {networkName}</strong>
                  <br />
                  Fast, fair, and nearly free transactions
                </div>
              </div>
            </div>


            <>
              <div
                onClick={handleGoogleSignIn}
                className="self-stretch h-16 px-4 py-5 bg-white rounded-[10px] outline outline-offset-[-1px] outline-black/50 inline-flex justify-center items-center gap-7 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <img src={"/images/icons/google.svg"} className="w-6 h-6 relative overflow-hidden" />
                <div className="justify-start text-black/50 text-xl font-bold font-inter">
                  {submitting ? "Connecting..." : "Continue with Google"}
                </div>
              </div>
              <div className="p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-xl font-normal font-inter">Or</div>
              </div>

              <div className="w-full ">
                <CustomConnectButton />
              </div>

              {/* Create New Wallet Option */}
              <div className="p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-lg font-normal font-inter">Don't have a wallet?</div>
              </div>
              <div
                onClick={handleCreateSequenceWallet}
                className="w-full h-max px-4 py-3 rounded-[10px] bg-blue-500 text-white inline-flex justify-center items-center gap-3 cursor-pointer hover:bg-blue-600 transition-colors"
              >
                <span className="text-xl">🔗</span>
                <div className="justify-start text-white text-lg font-bold font-inter">Create Sequence Wallet</div>
              </div>

              {/* Supported Wallets Info */}
              <div className="w-full p-4 bg-gray-50 rounded-lg">
                <div className="text-center text-gray-700 font-inter text-sm">
                  <strong>Recommended Wallets:</strong>
                  <div className="mt-2 flex justify-center gap-4 text-xs">
                    {SUPPORTED_WALLETS.filter(w => w.supported).map((wallet, index) => (
                      <span key={index} className="flex items-center gap-1">
                        <span>{wallet.icon}</span>
                        <span>{wallet.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>


          </div>
        </div>
      </Dialog>

      {/* Sequence Wallet Creator Modal */}
      {showSequenceCreator && (
        <SequenceWalletCreator
          onWalletCreated={handleSequenceWalletCreated}
          onClose={() => setShowSequenceCreator(false)}
        />
      )}
    </>
  );
}
