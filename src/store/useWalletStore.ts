import { create } from 'zustand';
import { WalletStrategy } from '@injectivelabs/wallet-strategy';
import { ChainId } from '@injectivelabs/ts-types';
import { Wallet } from '@injectivelabs/wallet-base';

interface WalletState {
  address: string;
  walletStrategy: WalletStrategy | null;
  isConnected: boolean;
  connect: (wallet: Wallet) => Promise<void>;
  disconnect: () => void;
}

const walletStrategy = new WalletStrategy({
  chainId: ChainId.Testnet,
  strategies: {},
});

export const useWalletStore = create<WalletState>((set) => ({
  address: '',
  walletStrategy,
  isConnected: false,
  connect: async (wallet: Wallet) => {
    try {
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
}));
