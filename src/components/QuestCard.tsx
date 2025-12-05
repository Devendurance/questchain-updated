import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Zap, ExternalLink } from 'lucide-react';
import { Quest, QuestDifficulty } from '../types';
import { useQuestStore } from '../store/useQuestStore';

interface QuestCardProps {
  quest: Quest;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const { projects, currentUser } = useQuestStore();
  const project = projects.find((p) => p.id === quest.projectId);
  const isCompleted = currentUser?.completedQuests.includes(quest.id);

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

  return (
    <div className="glass-card-hover overflow-hidden group">
      {/* Quest Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={quest.imageUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop'}
          alt={quest.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/50 to-transparent" />
        
        {/* Project Logo */}
        {project && (
          <div className="absolute top-4 left-4">
            <img
              src={project.logoUrl}
              alt={project.name}
              className="w-12 h-12 rounded-xl border-2 border-white/20"
            />
          </div>
        )}

        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <span className={`difficulty-pill border ${getDifficultyColor(quest.difficulty)}`}>
            {quest.difficulty}
          </span>
        </div>

        {/* Completed Badge */}
        {isCompleted && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Trophy className="w-3 h-3" />
              <span>Completed</span>
            </div>
          </div>
        )}
      </div>

      {/* Quest Content */}
      <div className="p-6">
        {/* Project Name */}
        {project && (
          <div className="text-sm text-injective-cyan font-semibold mb-2">
            {project.name}
          </div>
        )}

        {/* Quest Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-injective-cyan transition-colors">
          {quest.title}
        </h3>

        {/* Quest Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {quest.shortDescription}
        </p>

        {/* Quest Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-lg text-yellow-400">
              {quest.xpReward} XP
            </span>
          </div>

          <div className="text-xs text-gray-500 uppercase tracking-wide">
            {quest.questType}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/quest/${quest.id}`}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <span>{isCompleted ? 'View Details' : 'Start Quest'}</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
