import { useState } from 'react';
import { UserProfile } from '@/types/funnel';
import { StepWrapper } from '../StepWrapper';
import { Heart, Target, Zap, Trophy, ArrowRight } from 'lucide-react';

interface Step5MotivationProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

const motivations = [
  {
    id: 'health',
    icon: Heart,
    title: 'Saúde',
    description: 'Melhorar minha saúde e qualidade de vida',
    gradient: 'from-red-500 to-pink-500',
    bgGradient: 'from-red-500/10 to-pink-500/10'
  },
  {
    id: 'dreams',
    icon: Target,
    title: 'Sonhos',
    description: 'Realizar meus sonhos e objetivos',
    gradient: 'from-purple-500 to-blue-500',
    bgGradient: 'from-purple-500/10 to-blue-500/10'
  },
  {
    id: 'energy',
    icon: Zap,
    title: 'Energia',
    description: 'Ter mais energia e disposição',
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-500/10 to-orange-500/10'
  },
  {
    id: 'freedom',
    icon: Trophy,
    title: 'Liberdade',
    description: 'Me libertar do vício e dependência',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10'
  }
];

export const Step5Motivation = ({ userProfile, onUpdateProfile, onNext }: Step5MotivationProps) => {
  const [selectedMotivations, setSelectedMotivations] = useState<string[]>([]);

  const handleMotivationToggle = (motivationId: string) => {
    setSelectedMotivations(prev => {
      const newSelection = prev.includes(motivationId)
        ? prev.filter(id => id !== motivationId)
        : [...prev, motivationId];
      
      return newSelection;
    });
  };

  const handleNext = () => {
    onUpdateProfile({ 
      xp: userProfile.xp + 35,
      badges: [...userProfile.badges, 'Motivado para Mudança'] 
    });
    onNext();
  };

  return (
    <StepWrapper 
      title="Sua Motivação" 
      subtitle="O que mais te motiva a parar de fumar?"
    >
      <div className="space-y-6">
        {/* Motivations Grid */}
        <div className="space-y-4">
          {motivations.map((motivation, index) => (
            <div
              key={motivation.id}
              onClick={() => handleMotivationToggle(motivation.id)}
              className={`
                premium-card p-6 cursor-pointer transition-all duration-300
                ${selectedMotivations.includes(motivation.id)
                  ? 'border-primary/50 shadow-[var(--shadow-glow)] scale-[1.02]' 
                  : 'hover:border-primary/30 hover:scale-[1.01]'
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center
                  bg-gradient-to-br ${motivation.bgGradient}
                  border border-white/10
                `}>
                  <motivation.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-1">
                    {motivation.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {motivation.description}
                  </p>
                </div>

                {selectedMotivations.includes(motivation.id) && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Quote */}
        <div className="premium-card p-6 bg-gradient-to-r from-primary/20 to-dream/20 border-primary/30">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold text-lg text-foreground mb-2">
              "A motivação é o que te faz começar. O hábito é o que te faz continuar."
            </h3>
            <p className="text-muted-foreground text-sm">
              Escolher suas motivações é o primeiro passo para uma mudança duradoura.
            </p>
          </div>
        </div>

        {/* Action Button */}
        {selectedMotivations.length > 0 && (
          <div className="fade-up-premium">
            <button
              onClick={handleNext}
              className="w-full button-premium flex items-center justify-center gap-3"
            >
              <ArrowRight className="w-5 h-5" />
              Definir Estratégia
              <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                +35 XP
              </div>
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
        </div>
      </div>
    </StepWrapper>
  );
};