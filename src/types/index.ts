export interface User {
  address: string;
  username?: string;
  totalXP: number;
  level: number;
  completedQuests: string[];
  badges: Badge[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  twitterHandle: string;
  createdBy: string;
}

export enum QuestDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum QuestType {
  ONCHAIN = 'onchain',
  OFFCHAIN = 'offchain',
  HYBRID = 'hybrid',
}

export enum QuestStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface Quest {
  id: string;
  projectId: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  xpReward: number;
  difficulty: QuestDifficulty;
  questType: QuestType;
  status: QuestStatus;
  externalLink?: string;
  imageUrl?: string;
}

export interface QuestCompletion {
  id: string;
  questId: string;
  userAddress: string;
  completedAt: number;
  verified: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  requiredXP: number;
  imageUrl: string;
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  username?: string;
  totalXP: number;
  level: number;
}
