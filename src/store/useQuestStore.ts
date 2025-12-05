import { create } from 'zustand';
import { Quest, Project, User, QuestCompletion, Badge, QuestDifficulty, QuestType, QuestStatus } from '../types';

interface QuestState {
  quests: Quest[];
  projects: Project[];
  users: Map<string, User>;
  completions: QuestCompletion[];
  badges: Badge[];
  currentUser: User | null;
  
  // Actions
  addQuest: (quest: Quest) => void;
  addProject: (project: Project) => void;
  completeQuest: (questId: string, userAddress: string) => void;
  setCurrentUser: (address: string) => void;
  getUserProfile: (address: string) => User | undefined;
  getQuestsByProject: (projectId: string) => Quest[];
  getLeaderboard: () => User[];
}

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Helix',
    description: 'The premier decentralized exchange on Injective',
    logoUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop',
    website: 'https://helixapp.com',
    twitterHandle: '@helixapp',
    createdBy: 'inj1...',
  },
  {
    id: '2',
    name: 'Mito Finance',
    description: 'Advanced DeFi vaults and strategies',
    logoUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=200&h=200&fit=crop',
    website: 'https://mito.fi',
    twitterHandle: '@mitofinance',
    createdBy: 'inj2...',
  },
  {
    id: '3',
    name: 'Hydro Protocol',
    description: 'Liquid staking on Injective',
    logoUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop',
    website: 'https://hydro.com',
    twitterHandle: '@hydroprotocol',
    createdBy: 'inj3...',
  },
];

const mockQuests: Quest[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Make Your First Swap on Helix',
    shortDescription: 'Complete your first token swap on Helix DEX',
    detailedDescription: 'Navigate to Helix DEX and complete a token swap of any amount. This will help you understand how decentralized trading works on Injective.',
    xpReward: 100,
    difficulty: QuestDifficulty.EASY,
    questType: QuestType.ONCHAIN,
    status: QuestStatus.ACTIVE,
    externalLink: 'https://helixapp.com',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
  },
  {
    id: '2',
    projectId: '1',
    title: 'Provide Liquidity on Helix',
    shortDescription: 'Add liquidity to any trading pair',
    detailedDescription: 'Become a liquidity provider by adding tokens to a liquidity pool. Earn trading fees while supporting the ecosystem.',
    xpReward: 250,
    difficulty: QuestDifficulty.MEDIUM,
    questType: QuestType.ONCHAIN,
    status: QuestStatus.ACTIVE,
    externalLink: 'https://helixapp.com/pools',
    imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
  },
  {
    id: '3',
    projectId: '2',
    title: 'Deposit into a Mito Vault',
    shortDescription: 'Start earning with automated strategies',
    detailedDescription: 'Deposit assets into any Mito vault to start earning yield through automated DeFi strategies.',
    xpReward: 200,
    difficulty: QuestDifficulty.MEDIUM,
    questType: QuestType.ONCHAIN,
    status: QuestStatus.ACTIVE,
    externalLink: 'https://mito.fi',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
  },
  {
    id: '4',
    projectId: '3',
    title: 'Stake INJ with Hydro',
    shortDescription: 'Liquid stake your INJ tokens',
    detailedDescription: 'Stake your INJ tokens through Hydro Protocol and receive liquid staking tokens that can be used across DeFi.',
    xpReward: 300,
    difficulty: QuestDifficulty.MEDIUM,
    questType: QuestType.ONCHAIN,
    status: QuestStatus.ACTIVE,
    externalLink: 'https://hydro.com',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
  },
  {
    id: '5',
    projectId: '1',
    title: 'Follow Helix on Twitter',
    shortDescription: 'Join the Helix community',
    detailedDescription: 'Follow @helixapp on Twitter to stay updated with the latest features and announcements.',
    xpReward: 50,
    difficulty: QuestDifficulty.EASY,
    questType: QuestType.OFFCHAIN,
    status: QuestStatus.ACTIVE,
    externalLink: 'https://twitter.com/helixapp',
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=400&fit=crop',
  },
  {
    id: '6',
    projectId: '2',
    title: 'Complete the Mito Tutorial',
    shortDescription: 'Learn about vault strategies',
    detailedDescription: 'Go through the interactive tutorial on Mito Finance to understand how automated vault strategies work.',
    xpReward: 75,
    difficulty: QuestDifficulty.EASY,
    questType: QuestType.OFFCHAIN,
    status: QuestStatus.ACTIVE,
    externalLink: 'https://mito.fi/tutorial',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  },
  {
    id: '7',
    projectId: '3',
    title: 'Participate in Hydro Governance',
    shortDescription: 'Vote on a governance proposal',
    detailedDescription: 'Exercise your voting rights by participating in Hydro Protocol governance. Vote on any active proposal.',
    xpReward: 150,
    difficulty: QuestDifficulty.HARD,
    questType: QuestType.HYBRID,
    status: QuestStatus.ACTIVE,
    externalLink: 'https://hydro.com/governance',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=400&fit=crop',
  },
  {
    id: '8',
    projectId: '1',
    title: 'Trade 10+ Times on Helix',
    shortDescription: 'Become an active trader',
    detailedDescription: 'Complete at least 10 trades on Helix DEX to demonstrate your trading activity and commitment.',
    xpReward: 500,
    difficulty: QuestDifficulty.HARD,
    questType: QuestType.ONCHAIN,
    status: QuestStatus.ACTIVE,
    externalLink: 'https://helixapp.com',
    imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
  },
];

const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Explorer',
    description: 'Reached 100 XP',
    requiredXP: 100,
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Pathfinder',
    description: 'Reached 500 XP',
    requiredXP: 500,
    imageUrl: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Navigator',
    description: 'Reached 1000 XP',
    requiredXP: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=200&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'DeFi Native',
    description: 'Reached 2500 XP',
    requiredXP: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop',
  },
  {
    id: '5',
    name: 'Injective OG',
    description: 'Reached 5000 XP',
    requiredXP: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop',
  },
];

const calculateLevel = (xp: number): number => {
  if (xp >= 5000) return 5;
  if (xp >= 2500) return 4;
  if (xp >= 1000) return 3;
  if (xp >= 500) return 2;
  if (xp >= 100) return 1;
  return 0;
};

const getLevelName = (level: number): string => {
  const levels = ['Newcomer', 'Explorer', 'Pathfinder', 'Navigator', 'DeFi Native', 'Injective OG'];
  return levels[level] || 'Newcomer';
};

export const useQuestStore = create<QuestState>((set, get) => ({
  quests: mockQuests,
  projects: mockProjects,
  users: new Map(),
  completions: [],
  badges: mockBadges,
  currentUser: null,

  addQuest: (quest) => {
    set((state) => ({
      quests: [...state.quests, quest],
    }));
  },

  addProject: (project) => {
    set((state) => ({
      projects: [...state.projects, project],
    }));
  },

  completeQuest: (questId, userAddress) => {
    const state = get();
    const quest = state.quests.find((q) => q.id === questId);
    if (!quest) return;

    const completion: QuestCompletion = {
      id: `${questId}-${userAddress}-${Date.now()}`,
      questId,
      userAddress,
      completedAt: Date.now(),
      verified: true,
    };

    const users = new Map(state.users);
    let user = users.get(userAddress);

    if (!user) {
      user = {
        address: userAddress,
        totalXP: 0,
        level: 0,
        completedQuests: [],
        badges: [],
      };
    }

    user.totalXP += quest.xpReward;
    user.level = calculateLevel(user.totalXP);
    user.completedQuests.push(questId);

    // Award badges
    const earnedBadges = state.badges.filter(
      (badge) => badge.requiredXP <= user!.totalXP && !user!.badges.find((b) => b.id === badge.id)
    );
    user.badges.push(...earnedBadges);

    users.set(userAddress, user);

    set({
      completions: [...state.completions, completion],
      users,
      currentUser: state.currentUser?.address === userAddress ? user : state.currentUser,
    });
  },

  setCurrentUser: (address) => {
    const state = get();
    let user = state.users.get(address);

    if (!user) {
      user = {
        address,
        totalXP: 0,
        level: 0,
        completedQuests: [],
        badges: [],
      };
      const users = new Map(state.users);
      users.set(address, user);
      set({ users, currentUser: user });
    } else {
      set({ currentUser: user });
    }
  },

  getUserProfile: (address) => {
    return get().users.get(address);
  },

  getQuestsByProject: (projectId) => {
    return get().quests.filter((q) => q.projectId === projectId);
  },

  getLeaderboard: () => {
    const users = Array.from(get().users.values());
    return users.sort((a, b) => b.totalXP - a.totalXP);
  },
}));

export { calculateLevel, getLevelName };
