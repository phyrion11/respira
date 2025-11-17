
import { useState, useCallback } from 'react';
import { UserProfile } from '@/types/funnel';

export const useFunnelState = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: '',
    avatar: '',
    archetype: null,
    level: 1,
    xp: 0,
    respirCoins: 0,
    streak: 0,
    league: 'iniciante',
    dailyCigarettes: 0,
    cigarettePrice: 12,
    quitGoal: 'immediate',
    motivations: [],
    monthlySpend: 300,
    selectedDream: null,
    currentStep: 1,
    completedChallenges: [],
    badges: [],
    joinedSquad: false
  });

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const addXP = useCallback((amount: number) => {
    setUserProfile(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  }, []);

  const addCoins = useCallback((amount: number) => {
    setUserProfile(prev => ({
      ...prev,
      respirCoins: prev.respirCoins + amount
    }));
  }, []);

  const addBadge = useCallback((badge: string) => {
    setUserProfile(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }));
  }, []);

  const nextStep = useCallback(() => {
    setUserProfile(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  }, []);

  const previousStep = useCallback(() => {
    setUserProfile(prev => ({ 
      ...prev, 
      currentStep: Math.max(1, prev.currentStep - 1) 
    }));
  }, []);

  return {
    userProfile,
    updateProfile,
    addXP,
    addCoins,
    addBadge,
    nextStep,
    previousStep
  };
};
