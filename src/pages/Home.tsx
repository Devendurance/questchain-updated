import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Users, Trophy, TrendingUp, ArrowRight, Sparkles, Target, Rocket } from 'lucide-react';
import { useQuestStore } from '../store/useQuestStore';
import { useWalletStore } from '../store/useWalletStore';

export const Home: React.FC = () => {
  const { quests, users } = useQuestStore();
  const { isConnected } = useWalletStore();

  const totalUsers = users.size;
  const totalQuests = quests.length;
  const totalXP = Array.from(users.values()).reduce((sum, user) => sum + user.totalXP, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-injective-blue/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-injective-cyan/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-injective-cyan" />
              <span className="text-sm font-semibold text-injective-cyan">
                The Injective-wide Quest Engine
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Turn Injective exploration
              <br />
              <span className="bg-gradient-to-r from-injective-blue via-injective-cyan to-purple-500 bg-clip-text text-transparent">
                into progress
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Complete quests from top Injective projects, earn XP, and build your onchain reputation.
              The ultimate growth engine for user acquisition, activation, and retention.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!isConnected ? (
                <Link to="/quests" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Start Questing</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link to="/quests" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Browse Quests</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              <Link to="/for-projects" className="btn-secondary text-lg px-8 py-4">
                For Projects
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-injective-blue to-injective-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-injective-cyan mb-2">
                {totalUsers > 0 ? totalUsers.toLocaleString() : '1,234'}
              </div>
              <div className="text-gray-400">Active Users</div>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {totalQuests.toLocaleString()}
              </div>
              <div className="text-gray-400">Total Quests</div>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {totalXP > 0 ? totalXP.toLocaleString() : '45,678'}
              </div>
              <div className="text-gray-400">XP Earned</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Simple steps to start your journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Users */}
            <div className="glass-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-injective-blue to-injective-cyan rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Users</h3>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-injective-blue/20 rounded-full flex items-center justify-center text-injective-cyan font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Connect Your Wallet</h4>
                    <p className="text-gray-400 text-sm">
                      Use Keplr, Leap, or MetaMask to get started
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-injective-blue/20 rounded-full flex items-center justify-center text-injective-cyan font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Browse & Complete Quests</h4>
                    <p className="text-gray-400 text-sm">
                      Explore quests from top Injective projects
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-injective-blue/20 rounded-full flex items-center justify-center text-injective-cyan font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Earn XP & Badges</h4>
                    <p className="text-gray-400 text-sm">
                      Build your reputation and climb the leaderboard
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-injective-blue/20 rounded-full flex items-center justify-center text-injective-cyan font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Level Up</h4>
                    <p className="text-gray-400 text-sm">
                      Unlock exclusive badges and become an Injective OG
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Projects */}
            <div className="glass-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Projects</h3>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Your Project Profile</h4>
                    <p className="text-gray-400 text-sm">
                      Showcase your project to the Injective community
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Launch Quests</h4>
                    <p className="text-gray-400 text-sm">
                      Design engaging quests to onboard new users
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Grow Your Community</h4>
                    <p className="text-gray-400 text-sm">
                      Attract and activate users through gamification
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Track & Optimize</h4>
                    <p className="text-gray-400 text-sm">
                      Monitor engagement and retention metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-injective-blue/10 to-injective-cyan/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Ready to start your journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of users exploring the Injective ecosystem
              </p>
              <Link
                to="/quests"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
              >
                <Rocket className="w-5 h-5" />
                <span>Explore Quests</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
