import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Zap, Award, TrendingUp, Calendar } from 'lucide-react';
import { useQuestStore, getLevelName } from '../store/useQuestStore';
import { useWalletStore } from '../store/useWalletStore';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, quests, badges } = useQuestStore();
  const { isConnected, address } = useWalletStore();

  if (!isConnected || !currentUser) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Please connect your wallet</h1>
          <p className="text-gray-400 mb-6">
            Connect your wallet to view your profile and track your progress
          </p>
        </div>
      </div>
    );
  }

  const completedQuests = quests.filter((q) =>
    currentUser.completedQuests.includes(q.id)
  );

  const nextLevelXP = [100, 500, 1000, 2500, 5000, 10000];
  const currentLevelXP = nextLevelXP[currentUser.level] || 10000;
  const previousLevelXP = currentUser.level > 0 ? nextLevelXP[currentUser.level - 1] : 0;
  const progressToNextLevel =
    ((currentUser.totalXP - previousLevelXP) / (currentLevelXP - previousLevelXP)) * 100;

  const earnedBadges = badges.filter((badge) =>
    currentUser.badges.find((b) => b.id === badge.id)
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-20 h-20 bg-gradient-to-br from-injective-blue to-injective-cyan rounded-2xl flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  {currentUser.username || `${address.slice(0, 8)}...${address.slice(-4)}`}
                </h1>
                <div className="text-injective-cyan font-semibold">
                  {getLevelName(currentUser.level)}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  {currentUser.totalXP.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-injective-cyan mb-1">
                  {currentUser.level}
                </div>
                <div className="text-sm text-gray-400">Level</div>
              </div>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress to Level {currentUser.level + 1}</span>
              <span className="text-sm font-semibold text-injective-cyan">
                {currentUser.totalXP} / {currentLevelXP} XP
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-injective-blue to-injective-cyan transition-all duration-500"
                style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Completed Quests */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-injective-cyan" />
                  <span>Completed Quests</span>
                </h2>
                <span className="text-gray-400">
                  {completedQuests.length} {completedQuests.length === 1 ? 'quest' : 'quests'}
                </span>
              </div>

              {completedQuests.length > 0 ? (
                <div className="space-y-4">
                  {completedQuests.map((quest) => {
                    const project = quests.find((q) => q.id === quest.id);
                    return (
                      <div
                        key={quest.id}
                        className="glass-card p-4 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => navigate(`/quest/${quest.id}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{quest.title}</h3>
                            <p className="text-sm text-gray-400">{quest.shortDescription}</p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="font-bold text-yellow-400">
                              +{quest.xpReward}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No quests completed yet</p>
                  <button
                    onClick={() => navigate('/quests')}
                    className="btn-primary"
                  >
                    Start Your First Quest
                  </button>
                </div>
              )}
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 text-center">
                <TrendingUp className="w-8 h-8 text-injective-cyan mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">
                  {completedQuests.length}
                </div>
                <div className="text-sm text-gray-400">Quests Completed</div>
              </div>

              <div className="glass-card p-6 text-center">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">
                  {earnedBadges.length}
                </div>
                <div className="text-sm text-gray-400">Badges Earned</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Badges</span>
              </h2>

              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="glass-card p-3 text-center group hover:scale-105 transition-transform"
                    >
                      <img
                        src={badge.imageUrl}
                        alt={badge.name}
                        className="w-16 h-16 rounded-xl mx-auto mb-2"
                      />
                      <div className="text-xs font-semibold mb-1">{badge.name}</div>
                      <div className="text-xs text-gray-500">{badge.requiredXP} XP</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">
                    Complete quests to earn badges
                  </p>
                </div>
              )}
            </div>

            {/* Next Badge */}
            {currentUser.level < 5 && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-4">Next Badge</h3>
                {(() => {
                  const nextBadge = badges.find(
                    (b) => b.requiredXP > currentUser.totalXP
                  );
                  if (nextBadge) {
                    return (
                      <div className="text-center">
                        <img
                          src={nextBadge.imageUrl}
                          alt={nextBadge.name}
                          className="w-20 h-20 rounded-xl mx-auto mb-3 opacity-50"
                        />
                        <div className="font-semibold mb-1">{nextBadge.name}</div>
                        <div className="text-sm text-gray-400 mb-3">
                          {nextBadge.description}
                        </div>
                        <div className="text-sm text-injective-cyan">
                          {nextBadge.requiredXP - currentUser.totalXP} XP to go
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
