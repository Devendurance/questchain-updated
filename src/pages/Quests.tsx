import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { QuestCard } from '../components/QuestCard';
import { useQuestStore } from '../store/useQuestStore';
import { QuestDifficulty, QuestType } from '../types';

export const Quests: React.FC = () => {
  const { quests, projects } = useQuestStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuestDifficulty | ''>('');
  const [selectedType, setSelectedType] = useState<QuestType | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredQuests = useMemo(() => {
    return quests.filter((quest) => {
      const matchesSearch =
        quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject = !selectedProject || quest.projectId === selectedProject;
      const matchesDifficulty = !selectedDifficulty || quest.difficulty === selectedDifficulty;
      const matchesType = !selectedType || quest.questType === selectedType;

      return matchesSearch && matchesProject && matchesDifficulty && matchesType;
    });
  }, [quests, searchQuery, selectedProject, selectedDifficulty, selectedType]);

  const clearFilters = () => {
    setSelectedProject('');
    setSelectedDifficulty('');
    setSelectedType('');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedProject || selectedDifficulty || selectedType || searchQuery;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quest Feed</h1>
          <p className="text-xl text-gray-400">
            Explore and complete quests from top Injective projects
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search quests by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-card pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-injective-cyan"
            />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="bg-injective-cyan text-deep-navy px-2 py-0.5 rounded-full text-xs font-bold">
                  Active
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-gray-400 hover:text-white flex items-center space-x-2 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear all</span>
              </button>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Project Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full glass-card px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                >
                  <option value="">All Projects</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as QuestDifficulty | '')}
                  className="w-full glass-card px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                >
                  <option value="">All Difficulties</option>
                  <option value={QuestDifficulty.EASY}>Easy</option>
                  <option value={QuestDifficulty.MEDIUM}>Medium</option>
                  <option value={QuestDifficulty.HARD}>Hard</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Quest Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as QuestType | '')}
                  className="w-full glass-card px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                >
                  <option value="">All Types</option>
                  <option value={QuestType.ONCHAIN}>Onchain</option>
                  <option value={QuestType.OFFCHAIN}>Offchain</option>
                  <option value={QuestType.HYBRID}>Hybrid</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          Showing {filteredQuests.length} {filteredQuests.length === 1 ? 'quest' : 'quests'}
        </div>

        {/* Quest Grid */}
        {filteredQuests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No quests found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or search query
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn-secondary">
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
