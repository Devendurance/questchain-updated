import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, X, Zap } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
import { Wallet as WalletEnum } from '@injectivelabs/wallet-base';
import { useQuestStore } from '../store/useQuestStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { address, isConnected, connect, disconnect } = useWalletStore();
  const { currentUser, setCurrentUser } = useQuestStore();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConnect = async (wallet: WalletEnum) => {
    try {
      await connect(wallet);
      setShowWalletModal(false);
      // Set current user after connection
      const connectedAddress = useWalletStore.getState().address;
      if (connectedAddress) {
        setCurrentUser(connectedAddress);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowWalletModal(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/quests', label: 'Quests' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/for-projects', label: 'For Projects' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-injective-blue to-injective-cyan rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-injective-blue to-injective-cyan bg-clip-text text-transparent">
                QuestChain
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-injective-cyan'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Wallet Button & User Info */}
            <div className="hidden md:flex items-center space-x-4">
              {isConnected && currentUser && (
                <div className="flex items-center space-x-3 glass-card px-4 py-2">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-injective-cyan">
                      {currentUser.totalXP} XP
                    </div>
                    <div className="text-xs text-gray-400">
                      Level {currentUser.level}
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => (isConnected ? handleDisconnect() : setShowWalletModal(true))}
                className="btn-primary flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnected ? formatAddress(address) : 'Connect Wallet'}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-deep-navy/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-injective-cyan'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isConnected && currentUser && (
                <div className="glass-card px-4 py-3 mt-4">
                  <div className="text-sm font-semibold text-injective-cyan">
                    {currentUser.totalXP} XP
                  </div>
                  <div className="text-xs text-gray-400">Level {currentUser.level}</div>
                </div>
              )}
              <button
                onClick={() => {
                  isConnected ? handleDisconnect() : setShowWalletModal(true);
                  setMobileMenuOpen(false);
                }}
                className="btn-primary w-full flex items-center justify-center space-x-2 mt-4"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnected ? formatAddress(address) : 'Connect Wallet'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Connect Wallet</h2>
              <button
                onClick={() => setShowWalletModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleConnect(WalletEnum.Keplr)}
                className="w-full glass-card-hover p-4 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-injective-blue to-injective-cyan rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Keplr</div>
                  <div className="text-sm text-gray-400">Cosmos wallet</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect(WalletEnum.Leap)}
                className="w-full glass-card-hover p-4 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Leap</div>
                  <div className="text-sm text-gray-400">Cosmos wallet</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect(WalletEnum.Metamask)}
                className="w-full glass-card-hover p-4 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">MetaMask</div>
                  <div className="text-sm text-gray-400">EVM wallet</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
