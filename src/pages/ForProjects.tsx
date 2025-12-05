import React, { useState } from 'react';
import { Rocket, TrendingUp, Users, Target, Plus, CheckCircle } from 'lucide-react';
import { useQuestStore } from '../store/useQuestStore';
import { useWalletStore } from '../store/useWalletStore';
import { QuestDifficulty, QuestType, QuestStatus } from '../types';

export const ForProjects: React.FC = () => {
  const { addProject, addQuest, projects } = useQuestStore();
  const { isConnected, address } = useWalletStore();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectLogoUrl: '',
    projectWebsite: '',
    projectTwitter: '',
    questTitle: '',
    questShortDescription: '',
    questDetailedDescription: '',
    questXPReward: 100,
    questDifficulty: QuestDifficulty.EASY,
    questType: QuestType.ONCHAIN,
    questExternalLink: '',
    questImageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    // Create or update project
    const projectId = `project-${Date.now()}`;
    addProject({
      id: projectId,
      name: formData.projectName,
      description: formData.projectDescription,
      logoUrl: formData.projectLogoUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop',
      website: formData.projectWebsite,
      twitterHandle: formData.projectTwitter,
      createdBy: address,
    });

    // Create quest
    const questId = `quest-${Date.now()}`;
    addQuest({
      id: questId,
      projectId,
      title: formData.questTitle,
      shortDescription: formData.questShortDescription,
      detailedDescription: formData.questDetailedDescription,
      xpReward: formData.questXPReward,
      difficulty: formData.questDifficulty,
      questType: formData.questType,
      status: QuestStatus.ACTIVE,
      externalLink: formData.questExternalLink,
      imageUrl: formData.questImageUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    });

    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setFormData({
        projectName: '',
        projectDescription: '',
        projectLogoUrl: '',
        projectWebsite: '',
        projectTwitter: '',
        questTitle: '',
        questShortDescription: '',
        questDetailedDescription: '',
        questXPReward: 100,
        questDifficulty: QuestDifficulty.EASY,
        questType: QuestType.ONCHAIN,
        questExternalLink: '',
        questImageUrl: '',
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">
              Launch quests. Grow users. Keep them coming back.
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">For Projects</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            QuestChain is the ultimate growth engine for Injective projects. Create engaging quests
            to onboard, activate, and retain your community.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-injective-blue to-injective-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">User Acquisition</h3>
            <p className="text-gray-400">
              Attract new users to your protocol through gamified onboarding experiences
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Activation</h3>
            <p className="text-gray-400">
              Guide users to complete key actions and experience your product's value
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Retention</h3>
            <p className="text-gray-400">
              Keep users engaged with ongoing quests and reward loyal community members
            </p>
          </div>
        </div>

        {/* CTA Section */}
        {!showForm ? (
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to launch your first quest?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Create a project profile and design engaging quests to grow your community on Injective
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Quest</span>
            </button>
          </div>
        ) : (
          <div className="glass-card p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Quest Created!</h2>
                <p className="text-gray-400">
                  Your quest is now live and visible to all users
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Create New Quest</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-injective-cyan">
                      Project Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.projectName}
                          onChange={(e) =>
                            setFormData({ ...formData, projectName: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          placeholder="e.g., Helix Protocol"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Logo URL
                        </label>
                        <input
                          type="url"
                          value={formData.projectLogoUrl}
                          onChange={(e) =>
                            setFormData({ ...formData, projectLogoUrl: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          placeholder="https://..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                          Description *
                        </label>
                        <textarea
                          required
                          value={formData.projectDescription}
                          onChange={(e) =>
                            setFormData({ ...formData, projectDescription: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          rows={3}
                          placeholder="Brief description of your project"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Website</label>
                        <input
                          type="url"
                          value={formData.projectWebsite}
                          onChange={(e) =>
                            setFormData({ ...formData, projectWebsite: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          placeholder="https://yourproject.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Twitter Handle
                        </label>
                        <input
                          type="text"
                          value={formData.projectTwitter}
                          onChange={(e) =>
                            setFormData({ ...formData, projectTwitter: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          placeholder="@yourproject"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quest Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">
                      Quest Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                          Quest Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.questTitle}
                          onChange={(e) =>
                            setFormData({ ...formData, questTitle: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          placeholder="e.g., Make your first swap"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                          Short Description *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.questShortDescription}
                          onChange={(e) =>
                            setFormData({ ...formData, questShortDescription: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          placeholder="Brief one-line description"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                          Detailed Description *
                        </label>
                        <textarea
                          required
                          value={formData.questDetailedDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              questDetailedDescription: e.target.value,
                            })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          rows={4}
                          placeholder="Detailed instructions for completing the quest"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          XP Reward *
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={formData.questXPReward}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              questXPReward: parseInt(e.target.value),
                            })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Difficulty *
                        </label>
                        <select
                          required
                          value={formData.questDifficulty}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              questDifficulty: e.target.value as QuestDifficulty,
                            })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                        >
                          <option value={QuestDifficulty.EASY}>Easy</option>
                          <option value={QuestDifficulty.MEDIUM}>Medium</option>
                          <option value={QuestDifficulty.HARD}>Hard</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Quest Type *
                        </label>
                        <select
                          required
                          value={formData.questType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              questType: e.target.value as QuestType,
                            })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                        >
                          <option value={QuestType.ONCHAIN}>Onchain</option>
                          <option value={QuestType.OFFCHAIN}>Offchain</option>
                          <option value={QuestType.HYBRID}>Hybrid</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          External Link
                        </label>
                        <input
                          type="url"
                          value={formData.questExternalLink}
                          onChange={(e) =>
                            setFormData({ ...formData, questExternalLink: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          placeholder="https://..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                          Quest Image URL
                        </label>
                        <input
                          type="url"
                          value={formData.questImageUrl}
                          onChange={(e) =>
                            setFormData({ ...formData, questImageUrl: e.target.value })
                          }
                          className="w-full glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-injective-cyan"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center space-x-4 pt-4">
                    <button type="submit" className="btn-primary flex-1">
                      Create Quest
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
