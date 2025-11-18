import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import Step1CharacterCreation from './steps/Step1CharacterCreation';
import Step2RealityCheck from './steps/Step2RealityCheck';
import Step3GoalSelection from './steps/Step3GoalSelection';
import Step4Calculator from './steps/Step4Calculator';
import Step6BreathingChallenge from './steps/Step6BreathingChallenge';
import Step7MindfulnessChallenge from './steps/Step7MindfulnessChallenge';
import Step8ResistanceChallenge from './steps/Step8ResistanceChallenge';
import Step9FocusChallenge from './steps/Step9FocusChallenge';
import Step10BossChallenge from './steps/Step10BossChallenge';
import Step11FinalOffer from './steps/Step11FinalOffer';
import CheckpointModal from './CheckpointModal';
import { UserTrackingService, UserProgress, LeadData } from '../lib/supabase';

interface FunnelContainerProps {
  onScoreUpdate: (score: number) => void;
}

const FunnelContainer: React.FC<FunnelContainerProps> = ({ onScoreUpdate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [characterData, setCharacterData] = useState<any>({});
  const [progressData, setProgressData] = useState<any>({});
  const [leadData, setLeadData] = useState<LeadData>({});
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [savedProgress, setSavedProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    // Update score in parent component
    onScoreUpdate(totalScore);
  }, [totalScore, onScoreUpdate]);

  useEffect(() => {
    // Save progress whenever it changes
    if (!isLoading) {
      saveProgress();
    }
  }, [currentStep, totalScore, characterData, progressData, isLoading]);

  const initializeUser = async () => {
    try {
      const user = await UserTrackingService.getCurrentUser();
      setUserId(user?.id || null);

      const progress = await UserTrackingService.getOrCreateUserProgress(user?.id);
      
      if (progress && progress.current_step > 1) {
        setSavedProgress(progress);
        setShowCheckpoint(true);
      } else if (progress) {
        // Load existing progress
        setCurrentStep(progress.current_step);
        setTotalScore(progress.total_score);
        setCharacterData(progress.character_data || {});
        setProgressData(progress.progress_data || {});
      }
    } catch (error) {
      console.error('Error initializing user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async () => {
    const progress: UserProgress = {
      current_step: currentStep,
      total_score: totalScore,
      character_data: characterData,
      progress_data: progressData
    };

    if (userId) {
      await UserTrackingService.updateUserProgress(userId, progress);
    } else {
      UserTrackingService.saveProgressLocally(progress);
    }
  };

  const handleContinueFromCheckpoint = () => {
    if (savedProgress) {
      setCurrentStep(savedProgress.current_step);
      setTotalScore(savedProgress.total_score);
      setCharacterData(savedProgress.character_data || {});
      setProgressData(savedProgress.progress_data || {});
    }
    setShowCheckpoint(false);
  };

  const handleRestartFromBeginning = async () => {
    // Reset all progress
    setCurrentStep(1);
    setTotalScore(0);
    setCharacterData({});
    setProgressData({});
    setLeadData({});

    if (userId) {
      await UserTrackingService.updateUserProgress(userId, {
        current_step: 1,
        total_score: 0,
        character_data: {},
        progress_data: {}
      });
    } else {
      UserTrackingService.clearLocalProgress();
    }

    setShowCheckpoint(false);
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = Math.max(1, currentStep - 1);
    setCurrentStep(prevStep);
  };

  const handleScoreUpdate = (points: number) => {
    setTotalScore(prev => prev + points);
  };

  const handleCharacterUpdate = (data: any) => {
    setCharacterData(prev => ({ ...prev, ...data }));
  };

  const handleProgressUpdate = (data: any) => {
    setProgressData(prev => ({ ...prev, ...data }));
  };

  const handleLeadUpdate = async (data: Partial<LeadData>) => {
    const updatedLeadData = { ...leadData, ...data };
    setLeadData(updatedLeadData);

    // Save lead data to database
    if (Object.keys(updatedLeadData).length > 0) {
      try {
        if (userId) {
          updatedLeadData.user_id = userId;
        }
        updatedLeadData.conversion_step = currentStep;
        updatedLeadData.total_score = totalScore;

        await UserTrackingService.saveLeadData(updatedLeadData);
      } catch (error) {
        console.error('Error saving lead data:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="text-white text-lg font-medium">Carregando sua jornada...</span>
          </div>
        </div>
      </div>
    );
  }

  const renderCurrentStep = () => {
    const userProfile: UserProfile = {
      nickname: characterData.nickname || '',
      avatar: characterData.avatar || '',
      archetype: characterData.archetype || null,
      level: characterData.level || 1,
      xp: totalScore,
      respirCoins: characterData.respirCoins || 0,
      streak: characterData.streak || 0,
      league: characterData.league || 'iniciante',
      dailyCigarettes: characterData.dailyCigarettes || 0,
      cigarettePrice: characterData.cigarettePrice || 0,
      quitGoal: characterData.quitGoal || 'immediate',
      motivations: characterData.motivations || [],
      monthlySpend: characterData.monthlySpend || 0,
      selectedDream: characterData.selectedDream || null,
      currentStep: currentStep,
      completedChallenges: characterData.completedChallenges || [],
      badges: characterData.badges || [],
      joinedSquad: characterData.joinedSquad || false
    };

    const handleProfileUpdate = (updates: Partial<UserProfile>) => {
      handleCharacterUpdate(updates);
      if (updates.xp !== undefined) {
        setTotalScore(updates.xp);
      }
    };

    switch (currentStep) {
      case 1:
        return <Step1CharacterCreation userProfile={userProfile} onUpdateProfile={handleProfileUpdate} onNext={handleNext} />;
      case 2:
        return <Step2RealityCheck userProfile={userProfile} onUpdateProfile={handleProfileUpdate} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3GoalSelection userProfile={userProfile} onUpdateProfile={handleProfileUpdate} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4Calculator onNext={handleNext} onBack={handleBack} onUpdateScore={handleScoreUpdate} onUpdateProgress={handleProgressUpdate} characterData={characterData} />;
      case 5:
        return <Step6BreathingChallenge userProfile={userProfile} onUpdateProfile={handleProfileUpdate} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <Step7MindfulnessChallenge userProfile={userProfile} onUpdateProfile={handleProfileUpdate} onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <Step8ResistanceChallenge onNext={handleNext} onBack={handleBack} onUpdateScore={handleScoreUpdate} />;
      case 8:
        return <Step9FocusChallenge onNext={handleNext} onBack={handleBack} onUpdateScore={handleScoreUpdate} />;
      case 9:
        return <Step10BossChallenge userProfile={userProfile} onUpdateProfile={handleProfileUpdate} onNext={handleNext} onBack={handleBack} />;
      case 10:
        return <Step11FinalOffer userProfile={userProfile} onUpdateProfile={handleProfileUpdate} onNext={handleNext} onBack={handleBack} />;
      default:
        return <Step1CharacterCreation userProfile={userProfile} onUpdateProfile={handleProfileUpdate} onNext={handleNext} />;
    }
  };

  return (
    <>
      {renderCurrentStep()}
      
      <CheckpointModal
        isOpen={showCheckpoint}
        progress={savedProgress || { current_step: 1, total_score: 0, character_data: {}, progress_data: {} }}
        onContinue={handleContinueFromCheckpoint}
        onRestart={handleRestartFromBeginning}
      />
    </>
  );
};

export default FunnelContainer;