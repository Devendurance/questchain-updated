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
