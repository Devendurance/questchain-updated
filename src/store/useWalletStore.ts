import { create } from 'zustand';
import { WalletStrategy } from '@injectivelabs/wallet-strategy';
import { ChainId } from '@injectivelabs/ts-types';
import { Wallet } from '@injectivelabs/wallet-base';
import { detectKeplr, detectLeap, detectEVM, isMobile, openWalletDeepLink } from '../utils/walletDetection';

interface WalletState {
  address: string;
  walletStrategy: WalletStrategy | null;
  isConnected: boolean;
  availableWallets: {
    keplr: boolean;
    leap: boolean;
    evm: boolean;
  };  // ← ADD THIS
  connect: (wallet: Wallet) => Promise<void>;
  disconnect: () => void;
  checkAvailableWallets: () => Promise<void>;  // ← ADD THIS
}

const walletStrategy = new WalletStrategy({
  chainId: ChainId.Testnet,
  strategies: {},
});

export const useWalletStore = create<WalletState>((set) => ({
  availableWallets: {
  keplr: false,
  leap: false,
  evm: false,
},
  address: '',
  walletStrategy,
  isConnected: false,
  connect: async (wallet: Wallet) => {
  try {
    // First, detect if wallet is available
    let isAvailable = false;
    
    if (wallet === 'keplr') {
      isAvailable = await detectKeplr();
    } else if (wallet === 'leap') {
      isAvailable = await detectLeap();
    } else if (wallet === 'metamask' || wallet === 'evm') {
      isAvailable = await detectEVM();
    }
    
    // If not available and on mobile, try deep link
    if (!isAvailable && isMobile()) {
      if (wallet === 'keplr') {
        openWalletDeepLink('keplr');
        return;
      } else if (wallet === 'leap') {
        openWalletDeepLink('leap');
        return;
      } else if (wallet === 'metamask' || wallet === 'evm') {
        openWalletDeepLink('metamask');
        return;
      }
    }
    
    // If not available on desktop, show install message
    if (!isAvailable) {
      console.error(`${wallet} wallet not detected. Please install the extension or use the wallet's in-app browser.`);
      return;
    }
    
    // Proceed with connection
    walletStrategy.setWallet(wallet);
    const addresses = await walletStrategy.getAddresses();
    
    if (addresses && addresses.length > 0) {
      set({ address: addresses[0], isConnected: true });
    }
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
},
  disconnect: () => {
    set({ address: '', isConnected: false });
  },
  checkAvailableWallets: async () => {
  const [keplrAvailable, leapAvailable, evmAvailable] = await Promise.all([
    detectKeplr(),
    detectLeap(),
    detectEVM()
  ]);
  
  set({
    availableWallets: {
      keplr: keplrAvailable,
      leap: leapAvailable,
      evm: evmAvailable
    }
  });
},
}));
