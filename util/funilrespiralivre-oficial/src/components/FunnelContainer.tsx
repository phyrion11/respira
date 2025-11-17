
import { useEffect } from 'react';
import { GameInterface } from './GameInterface';
import { Step1CharacterCreation } from './steps/Step1CharacterCreation';
import { Step2RealityCheck } from './steps/Step2RealityCheck';
import { Step3GoalSelection } from './steps/Step3GoalSelection';
import { Step4SquadInvite } from './steps/Step4SquadInvite';
import { Step5FirstChallenge } from './steps/Step5FirstChallenge';
import { Challenge1Breathing } from './challenges/Challenge1Breathing';
import { Challenge2Focus } from './challenges/Challenge2Focus';
import { Challenge3Memory } from './challenges/Challenge3Memory';
import { Challenge4Reaction } from './challenges/Challenge4Reaction';
import { Challenge5BossFight } from './challenges/Challenge5BossFight';
import { Step7Results } from './steps/Step7Results';
import { Step10SalesPage } from './steps/Step10SalesPage';
import { NotificationSystem, useNotifications } from './NotificationSystem';
import { useFunnelState } from '@/hooks/useFunnelState';

const TOTAL_STEPS = 10;

export const FunnelContainer = () => {
  const { userProfile, updateProfile, addXP, addCoins, addBadge, nextStep } = useFunnelState();
  
  console.log('FunnelContainer rendering, current step:', userProfile.currentStep);
  
  const renderCurrentStep = () => {
    switch (userProfile.currentStep) {
      case 1:
        return (
          <Step1CharacterCreation
            userProfile={userProfile}
            onUpdateProfile={updateProfile}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2RealityCheck
            userProfile={userProfile}
            onUpdateProfile={updateProfile}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <Step3GoalSelection
            userProfile={userProfile}
            onUpdateProfile={updateProfile}
            onNext={nextStep}
          />
        );
      case 4:
        return (
          <Step4SquadInvite
            userProfile={userProfile}
            onUpdateProfile={updateProfile}
            onNext={nextStep}
          />
        );
      case 5:
        return <Challenge1Breathing userProfile={userProfile} onUpdateProfile={updateProfile} onNext={nextStep} onSkip={nextStep} />;
      case 6:
        return <Challenge2Focus userProfile={userProfile} onUpdateProfile={updateProfile} onNext={nextStep} onSkip={nextStep} />;
      case 7:
        return <Challenge3Memory userProfile={userProfile} onUpdateProfile={updateProfile} onNext={nextStep} onSkip={nextStep} />;
      case 8:
        return <Challenge4Reaction userProfile={userProfile} onUpdateProfile={updateProfile} onNext={nextStep} onSkip={nextStep} />;
      case 9:
        return <Challenge5BossFight userProfile={userProfile} onUpdateProfile={updateProfile} onNext={nextStep} onSkip={nextStep} />;
      case 10:
        return <Step10SalesPage userProfile={userProfile} onUpdateProfile={updateProfile} />;
      default:
        return <Step10SalesPage userProfile={userProfile} onUpdateProfile={updateProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Game Interface - só mostra após criar personagem */}
      {userProfile.nickname && (
        <GameInterface userProfile={userProfile} />
      )}
      
      {renderCurrentStep()}
      
      <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg">
        Step: {userProfile.currentStep}
      </div>
    </div>
  );
};
