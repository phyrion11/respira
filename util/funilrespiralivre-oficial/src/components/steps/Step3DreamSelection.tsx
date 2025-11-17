import { useState } from 'react';
import { UserProfile, DreamItem } from '@/types/funnel';
import { dreamCatalog } from '@/data/dreams';
import { StepWrapper } from '../StepWrapper';
import { Heart, Sparkles, TrendingUp } from 'lucide-react';

interface Step3DreamSelectionProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

export const Step3DreamSelection = ({ userProfile, onUpdateProfile, onNext }: Step3DreamSelectionProps) => {
  const [selectedDream, setSelectedDream] = useState<DreamItem | null>(userProfile.selectedDream);
  
  const userDreams = dreamCatalog.filter(dream => 
    userProfile.archetype ? dream.category === userProfile.archetype : true
  );

  const handleDreamSelect = (dream: DreamItem) => {
    setSelectedDream(dream);
    onUpdateProfile({ 
      selectedDream: dream,
      xp: userProfile.xp + 25,
      badges: [...userProfile.badges, 'Sonhador Determinado'] 
    });
  };

  const handleNext = () => {
    if (selectedDream) {
      onNext();
    }
  };

  return (
    <StepWrapper 
      title="Escolha Seu Sonho" 
      subtitle="Qual desejo você quer realizar primeiro?"
    >
      <div className="space-y-6">
        {/* Dreams Grid */}
        <div className="grid grid-cols-1 gap-4">
          {userDreams.slice(0, 4).map((dream, index) => (
            <div
              key={dream.id}
              onClick={() => handleDreamSelect(dream)}
              className={`
                premium-card p-4 cursor-pointer transition-all duration-300
                ${selectedDream?.id === dream.id 
                  ? 'border-primary/50 shadow-[var(--shadow-glow)] scale-[1.02]' 
                  : 'hover:border-primary/30 hover:scale-[1.01]'
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-dream/20 rounded-xl flex items-center justify-center text-2xl border border-primary/20">
                  {dream.category === 'tech-lover' && '📱'}
                  {dream.category === 'adventurer' && '🗺️'}
                  {dream.category === 'family-first' && '👨‍👩‍👧‍👦'}
                  {dream.category === 'luxury-seeker' && '💎'}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-1">{dream.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{dream.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gradient">
                      R$ {dream.price.toLocaleString('pt-BR')}
                    </span>
                    {selectedDream?.id === dream.id && (
                      <div className="flex items-center gap-1 text-primary text-sm">
                        <Heart className="w-4 h-4 fill-current" />
                        <span>Escolhido</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Emotional Benefit */}
              <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-dream/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{dream.emotionalBenefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        {selectedDream && (
          <div className="fade-up-premium">
            <button
              onClick={handleNext}
              className="w-full button-premium flex items-center justify-center gap-3"
            >
              <TrendingUp className="w-5 h-5" />
              Vamos Calcular Sua Jornada
              <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                +25 XP
              </div>
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
        </div>
      </div>
    </StepWrapper>
  );
};