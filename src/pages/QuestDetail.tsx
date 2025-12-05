import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Zap, Trophy, CheckCircle, AlertCircle } from 'lucide-react';
import { useQuestStore } from '../store/useQuestStore';
import { useWalletStore } from '../store/useWalletStore';
import { QuestDifficulty } from '../types';

export const QuestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quests, projects, currentUser, completeQuest } = useQuestStore();
  const { isConnected } = useWalletStore();
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');

  const quest = quests.find((q) => q.id === id);
  const project = quest ? projects.find((p) => p.id === quest.projectId) : null;
  const isCompleted = currentUser?.completedQuests.includes(quest?.id || '');

  if (!quest || !project) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Quest not found</h1>
          <button onClick={() => navigate('/quests')} className="btn-primary">
            Back to Quests
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: QuestDifficulty) => {
    switch (difficulty) {
      case QuestDifficulty.EASY:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case QuestDifficulty.MEDIUM:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case QuestDifficulty.HARD:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const handleCompleteQuest = () => {
    if (!isConnected) {
      setCompletionMessage('Please connect your wallet first');
      return;
    }

    if (!currentUser) {
      setCompletionMessage('User profile not found');
      return;
    }

    if (isCompleted) {
      setCompletionMessage('You have already completed this quest');
      return;
    }

    completeQuest(quest.id, currentUser.address);
    setShowXPAnimation(true);
    setCompletionMessage(`Congratulations! You earned ${quest.xpReward} XP!`);

    setTimeout(() => {
      setShowXPAnimation(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/quests')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Quests</span>
        </button>

        {/* Quest Header Image */}
        <div className="relative h-80 rounded-2xl overflow-hidden mb-8">
          <img
            src={quest.imageUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop'}
            alt={quest.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/50 to-transparent" />

          {/* Project Info Overlay */}
          <div className="absolute bottom-6 left-6 flex items-center space-x-4">
            <img
              src={project.logoUrl}
              alt={project.name}
              className="w-16 h-16 rounded-xl border-2 border-white/20"
            />
            <div>
              <div className="text-sm text-injective-cyan font-semibold mb-1">
                {project.name}
              </div>
              <h1 className="text-3xl font-bold">{quest.title}</h1>
            </div>
          </div>

          {/* Difficulty Badge */}
          <div className="absolute top-6 right-6">
            <span className={`difficulty-pill border ${getDifficultyColor(quest.difficulty)}`}>
              {quest.difficulty}
            </span>
          </div>

          {/* Completed Badge */}
          {isCompleted && (
            <div className="absolute top-6 left-6">
              <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Completed</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quest Info */}
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Quest Details</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {quest.detailedDescription}
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="glass-card px-4 py-2 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">{quest.xpReward} XP</span>
                </div>

                <div className="glass-card px-4 py-2">
                  <span className="text-sm text-gray-400 uppercase tracking-wide">
                    {quest.questType}
                  </span>
                </div>

                <div className={`difficulty-pill border ${getDifficultyColor(quest.difficulty)}`}>
                  {quest.difficulty}
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">About {project.name}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-3">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}

                {project.twitterHandle && (
                  <a
                    href={`https://twitter.com/${project.twitterHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="glass-card p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Complete Quest</h3>

              {!isConnected && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-400">
                    Connect your wallet to complete quests and earn XP
                  </p>
                </div>
              )}

              {isCompleted && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4 flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-400">
                    You've already completed this quest and earned {quest.xpReward} XP!
                  </p>
                </div>
              )}

              {completionMessage && !isCompleted && (
                <div className={`${
                  completionMessage.includes('Congratulations')
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                } border rounded-xl p-4 mb-4`}>
                  <p className="text-sm">{completionMessage}</p>
                </div>
              )}

              {quest.externalLink && (
                <a
                  href={quest.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full mb-3 flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit {project.name}</span>
                </a>
              )}

              <button
                onClick={handleCompleteQuest}
                disabled={!isConnected || isCompleted}
                className={`w-full flex items-center justify-center space-x-2 ${
                  !isConnected || isCompleted
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'btn-primary'
                } py-3 px-6 rounded-xl font-semibold transition-all`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Trophy className="w-5 h-5" />
                    <span>Mark as Complete</span>
                  </>
                )}
              </button>

              {showXPAnimation && (
                <div className="mt-4 text-center">
                  <div className="xp-animation text-3xl font-bold text-yellow-400">
                    +{quest.xpReward} XP
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
