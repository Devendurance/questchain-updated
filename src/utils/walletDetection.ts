// Utility functions for detecting wallets across different devices and browsers

export const detectKeplr = async (maxAttempts = 10, interval = 100): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    if (window.keplr) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  return false;
};

export const detectLeap = async (maxAttempts = 10, interval = 100): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    if (window.leap) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  return false;
};

export const detectEVM = async (maxAttempts = 10, interval = 100): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    if (window.ethereum) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  return false;
};

export const isMobile = (): boolean => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const openWalletDeepLink = (walletType: 'keplr' | 'leap' | 'metamask') => {
  const dappUrl = encodeURIComponent(window.location.href);
  
  const deepLinks = {
    keplr: `keplrwallet://wcV2?${dappUrl}`,
    leap: `leapwallet://wcV2?${dappUrl}`,
    metamask: `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`
  };
  
  window.location.href = deepLinks[walletType];
};

// Chain configuration for Injective Testnet
export const injectiveTestnetConfig = {
  chainId: 'injective-888',
  chainName: 'Injective Testnet',
  rpc: 'https://testnet.sentry.tm.injective.network:443',
  rest: 'https://testnet.sentry.lcd.injective.network:443',
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'inj',
    bech32PrefixAccPub: 'injpub',
    bech32PrefixValAddr: 'injvaloper',
    bech32PrefixValPub: 'injvaloperpub',
    bech32PrefixConsAddr: 'injvalcons',
    bech32PrefixConsPub: 'injvalconspub',
  },
  currencies: [
    {
      coinDenom: 'INJ',
      coinMinimalDenom: 'inj',
      coinDecimals: 18,
      coinGeckoId: 'injective-protocol',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'INJ',
      coinMinimalDenom: 'inj',
      coinDecimals: 18,
      coinGeckoId: 'injective-protocol',
      gasPriceStep: {
        low: 500000000,
        average: 1000000000,
        high: 1500000000,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'INJ',
    coinMinimalDenom: 'inj',
    coinDecimals: 18,
    coinGeckoId: 'injective-protocol',
  },
  features: ['ibc-transfer', 'ibc-go'],
};

// Add Injective Testnet to Keplr
export const addInjectiveTestnetToKeplr = async (): Promise<boolean> => {
  try {
    if (!window.keplr) {
      throw new Error('Keplr wallet not found');
    }
    
    await window.keplr.experimentalSuggestChain(injectiveTestnetConfig);
    return true;
  } catch (error) {
    console.error('Failed to add Injective Testnet to Keplr:', error);
    return false;
  }
};

// Add Injective Testnet to Leap
export const addInjectiveTestnetToLeap = async (): Promise<boolean> => {
  try {
    if (!window.leap) {
      throw new Error('Leap wallet not found');
    }
    
    await window.leap.experimentalSuggestChain(injectiveTestnetConfig);
    return true;
  } catch (error) {
    console.error('Failed to add Injective Testnet to Leap:', error);
    return false;
  }
};

// Add Injective Testnet to wallet (works for both Keplr and Leap)
export const addInjectiveTestnetToWallet = async (walletType: 'keplr' | 'leap'): Promise<boolean> => {
  if (walletType === 'keplr') {
    return await addInjectiveTestnetToKeplr();
  } else if (walletType === 'leap') {
    return await addInjectiveTestnetToLeap();
  }
  return false;
};
