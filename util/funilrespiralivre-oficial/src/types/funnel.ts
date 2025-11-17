
export type UserArchetype = 'tech-lover' | 'adventurer' | 'family-first' | 'luxury-seeker';
export type LeagueType = 'iniciante' | 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante' | 'liberdade';

export interface DreamItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  emotionalBenefit: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    archetype: UserArchetype;
    points: number;
  }[];
}

export interface ArchetypeResult {
  title: string;
  description: string;
  traits: string[];
  icon: string;
  type: string;
}

export interface UserProfile {
  // Character Info
  nickname: string;
  avatar: string;
  archetype: UserArchetype | null;
  
  // Game Stats
  level: number;
  xp: number;
  respirCoins: number;
  streak: number;
  league: LeagueType;
  
  // Cessation Data
  dailyCigarettes: number;
  cigarettePrice: number;
  quitGoal: 'immediate' | 'gradual' | 'reduction';
  motivations: string[];
  
  // Financial Data
  monthlySpend: number;
  selectedDream: DreamItem | null;
  
  // Progress Tracking
  currentStep: number;
  completedChallenges: string[];
  badges: string[];
  joinedSquad: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  duration: number; // minutes
  type: 'breathing' | 'knowledge' | 'social' | 'tracking';
}

export interface LeagueInfo {
  name: string;
  minDays: number;
  color: string;
  icon: string;
  benefits: string[];
}
