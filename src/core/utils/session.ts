// Session management utilities for Touch Grass app

export interface WalletSession {
  connected: boolean;
  address: string;
  walletId: string;
  walletName: string;
  isEmbedded: boolean;
  signInMethod: string;
  connectedAt: string;
  network: string;
  chainId: number;
}

// Client-side session management
export const sessionUtils = {
  // Store session data (client-side only)
  setSession: (sessionData: WalletSession) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('touch-grass-session', JSON.stringify(sessionData));
      // Also set cookie for middleware
      document.cookie = 'wallet-connected=true; path=/; max-age=86400'; // 24 hours
    }
  },

  // Get session data (client-side only)
  getSession: (): WalletSession | null => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('touch-grass-session');
      if (session) {
        try {
          return JSON.parse(session);
        } catch (error) {
          console.error('Error parsing session:', error);
          sessionUtils.clearSession();
          return null;
        }
      }
    }
    return null;
  },

  // Clear session data
  clearSession: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('touch-grass-session');
      // Clear cookie
      document.cookie = 'wallet-connected=false; path=/; max-age=0';
    }
  },

  // Check if user is connected (client-side)
  isConnected: (): boolean => {
    const session = sessionUtils.getSession();
    return session?.connected === true;
  },

  // Get wallet address (client-side)
  getWalletAddress: (): string | null => {
    const session = sessionUtils.getSession();
    return session?.address || null;
  },

  // Check if user is on correct network (Etherlink Testnet)
  isOnCorrectNetwork: (): boolean => {
    const session = sessionUtils.getSession();
    return session?.chainId === 128123; // Etherlink Testnet
  },

  // Get current network info
  getCurrentNetwork: () => {
    const session = sessionUtils.getSession();
    return {
      chainId: session?.chainId,
      network: session?.network,
      isCorrect: session?.chainId === 128123
    };
  },

  // Update session with new network info
  updateNetwork: (chainId: number, network: string) => {
    const session = sessionUtils.getSession();
    if (session) {
      const updatedSession = {
        ...session,
        chainId,
        network
      };
      sessionUtils.setSession(updatedSession);
    }
  }
};

// Server-side session check (for API routes)
export const serverSessionUtils = {
  // Check if request has valid session cookie
  hasValidSession: (cookies: { [key: string]: string }): boolean => {
    return cookies['wallet-connected'] === 'true';
  },

  // Get session from cookies (limited data available)
  getSessionFromCookies: (cookies: { [key: string]: string }) => {
    const hasSession = serverSessionUtils.hasValidSession(cookies);
    return hasSession ? { connected: true } : null;
  }
};