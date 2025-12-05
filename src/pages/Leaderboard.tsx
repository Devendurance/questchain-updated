import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useQuestStore, getLevelName } from '../store/useQuestStore';

type TimeFilter = 'all' | 'month' | 'week';

export const Leaderboard: React.FC = () => {
  const { getLeaderboard } = useQuestStore();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  const leaderboard = getLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-500 font-bold">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-600 to-red-600';
      default:
        return 'bg-white/5';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
            <TrendingUp className="w-4 h-4 text-injective-cyan" />
            <span className="text-sm font-semibold text-injective-cyan">
              The most committed explorers of the Injective ecosystem
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Leaderboard</h1>
          <p className="text-xl text-gray-400">
            Compete with other users and climb to the top
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-1 inline-flex rounded-xl">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeFilter === 'all'
                  ? 'bg-gradient-to-r from-injective-blue to-injective-cyan text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeFilter === 'month'
                  ? 'bg-gradient-to-r from-injective-blue to-injective-cyan text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeFilter === 'week'
                  ? 'bg-gradient-to-r from-injective-blue to-injective-cyan text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="flex flex-col items-center pt-12">
              <div className="glass-card p-6 w-full text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center">
                  <Medal className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-400 mb-1">2nd Place</div>
                <div className="font-bold text-lg mb-1 truncate">
                  {leaderboard[1].username || `${leaderboard[1].address.slice(0, 8)}...`}
                </div>
                <div className="text-2xl font-bold text-gray-400 mb-2">
                  {leaderboard[1].totalXP.toLocaleString()} XP
                </div>
                <div className="text-xs text-gray-500">
                  {getLevelName(leaderboard[1].level)}
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="glass-card p-6 w-full text-center border-2 border-yellow-500/50">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm text-yellow-400 mb-1">1st Place</div>
                <div className="font-bold text-xl mb-1 truncate">
                  {leaderboard[0].username || `${leaderboard[0].address.slice(0, 8)}...`}
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {leaderboard[0].totalXP.toLocaleString()} XP
                </div>
                <div className="text-xs text-gray-400">
                  {getLevelName(leaderboard[0].level)}
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-12">
              <div className="glass-card p-6 w-full text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-400 mb-1">3rd Place</div>
                <div className="font-bold text-lg mb-1 truncate">
                  {leaderboard[2].username || `${leaderboard[2].address.slice(0, 8)}...`}
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {leaderboard[2].totalXP.toLocaleString()} XP
                </div>
                <div className="text-xs text-gray-500">
                  {getLevelName(leaderboard[2].level)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                    Level
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">
                    Total XP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leaderboard.length > 0 ? (
                  leaderboard.map((user, index) => (
                    <tr
                      key={user.address}
                      className={`hover:bg-white/5 transition-colors ${
                        index < 3 ? getRankBadgeColor(index + 1) + '/10' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(index + 1)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">
                          {user.username || `${user.address.slice(0, 12)}...${user.address.slice(-4)}`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center space-x-2 glass-card px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-injective-cyan">
                            {getLevelName(user.level)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-lg">
                          {user.totalXP.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">XP</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No users on the leaderboard yet. Be the first to complete quests!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
