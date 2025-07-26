"use client";

import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import SignIn from '../Dialogs/SignIn';

export default function Header() {
  const { isConnected, address } = useAccount();
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render wallet state until client-side
  if (!isMounted) {
    return (
      <div className="w-full h-max py-3 px-6 flex justify-between items-center relative bg-green-500/60 overflow-hidden">
        <img className="w-16 h-16 rounded-full" src="/images/brand/logo.svg" />

        <div className='flex items-center gap-4'>
          <div className="w-full inline-flex justify-start items-center gap-7">
            <div className="w-11 relative flex justify-center items-center">
              <div className="w-11 h-11 bg-green-950/50 rounded-full flex justify-center items-center" >
                <img src="/images/icons/notify.svg" className='' />
              </div>
            </div>
            <div className="w-11 h-max relative flex justify-start items-center gap-2.5">
              <div className="w-11 h-11 bg-green-950/50 rounded-full flex justify-center items-center" >
                <img src="/images/icons/user.svg" className='' />
              </div>
            </div>
          </div>

          <div onClick={() => setIsSignInDialogOpen(true)} className="w-full px-4 py-5 cursor-pointer rounded-[10px] outline outline-offset-[-1px] outline-green-500 inline-flex justify-center items-center gap-2.5">
            <div className="text-center justify-start text-white text-2xl font-medium font-inter leading-tight">Sign Up</div>
          </div>
        </div>

        <SignIn
          visible={isSignInDialogOpen}
          hideDialog={() => setIsSignInDialogOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-max py-3 px-6 flex justify-between items-center relative bg-green-500/60 overflow-hidden">
      <img className="w-16 h-16 rounded-full" src="/images/brand/logo.svg" />

      <div className='flex items-center gap-4'>
        <div className="w-full inline-flex justify-start items-center gap-7">
          <div className="w-11 relative flex justify-center items-center">
            <div className="w-11 h-11 bg-green-950/50 rounded-full flex justify-center items-center" >
              <img src="/images/icons/notify.svg" className='' />
            </div>
          </div>
          <div className="w-11 h-max relative flex justify-start items-center gap-2.5">
            <div className="w-11 h-11 bg-green-950/50 rounded-full flex justify-center items-center" >
              <img src="/images/icons/user.svg" className='' />
            </div>
          </div>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-inter">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <ConnectButton />
          </div>
        ) : (
          <div onClick={() => setIsSignInDialogOpen(true)} className="w-full px-4 py-5 cursor-pointer rounded-[10px] outline outline-offset-[-1px] outline-green-500 inline-flex justify-center items-center gap-2.5">
            <div className="text-center justify-start text-white text-2xl font-medium font-inter leading-tight">Sign Up</div>
          </div>
        )}
      </div>

      <SignIn
        visible={isSignInDialogOpen}
        hideDialog={() => setIsSignInDialogOpen(false)}
      />
    </div>
  );
}