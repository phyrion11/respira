
import { useState } from 'react';
import { UserProfile } from '@/types/funnel';
import { Target, Zap, TrendingDown, Rocket, CheckCircle } from 'lucide-react';

interface Step3GoalSelectionProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

const goals = [
  {
    id: 'immediate',
    title: 'Parar Imediatamente',
    subtitle: 'Modo Hardcore',
    icon: Rocket,
    description: 'Zero cigarro a partir de agora',
    difficulty: 'Extremo',
    xpMultiplier: '3x',
    coinBonus: '500 coins extras',
    color: 'from-red-500 to-orange-500',
    bgColor: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    recommended: false
  },
  {
    id: 'gradual',
    title: 'Redução Gradual',
    subtitle: 'Modo Estratégico',
    icon: TrendingDown,
    description: 'Diminuir 25% por semana até zero',
    difficulty: 'Moderado',
    xpMultiplier: '2x',
    coinBonus: '200 coins extras',
    color: 'from-blue-500 to-purple-500',
    bgColor: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
    recommended: true
  },
  {
    id: 'reduction',
    title: 'Redução de Danos',
    subtitle: 'Modo Flexível',
    icon: Target,
    description: 'Reduzir 70% do consumo atual',
    difficulty: 'Fácil',
    xpMultiplier: '1.5x',
    coinBonus: '100 coins extras',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    recommended: false
  }
];

export const Step3GoalSelection = ({ userProfile, onUpdateProfile, onNext }: Step3GoalSelectionProps) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleConfirm = () => {
    if (selectedGoal) {
      setIsConfirming(true);
      setTimeout(() => {
        const goal = goals.find(g => g.id === selectedGoal)!;
        const xpBonus = selectedGoal === 'immediate' ? 150 : selectedGoal === 'gradual' ? 100 : 75;
        const coinBonus = selectedGoal === 'immediate' ? 500 : selectedGoal === 'gradual' ? 200 : 100;
        
        onUpdateProfile({
          quitGoal: selectedGoal as any,
          xp: userProfile.xp + xpBonus,
          respirCoins: userProfile.respirCoins + coinBonus,
          badges: [...userProfile.badges, `Meta ${goal.title}`]
        });
        onNext();
      }, 1500);
    }
  };

  if (isConfirming) {
    const selectedGoalData = goals.find(g => g.id === selectedGoal)!;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center space-y-6 animate-fade-up">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-success rounded-3xl flex items-center justify-center mx-auto animate-glow-pulse">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Meta Definida!
          </h2>
          <div className={`premium-card p-6 bg-gradient-to-r ${selectedGoalData.bgColor} border ${selectedGoalData.borderColor}`}>
            <selectedGoalData.icon className="w-12 h-12 mx-auto mb-4 text-foreground" />
            <h3 className="text-xl font-bold mb-2">{selectedGoalData.title}</h3>
            <p className="text-muted-foreground mb-4">{selectedGoalData.description}</p>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-bold text-success">Ativando modo {selectedGoalData.subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-dream/5 flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
        
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-gradient mb-4">
            Escolha Sua Missão
          </h1>
          <p className="text-muted-foreground">
            Cada modo tem recompensas diferentes. Escolha o que faz mais sentido para você.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`
                premium-card p-6 cursor-pointer transition-all duration-300 relative overflow-hidden
                ${selectedGoal === goal.id 
                  ? `${goal.borderColor} shadow-lg scale-105` 
                  : 'hover:scale-102 hover:border-primary/30'
                }
              `}
            >
              {/* Recommended Badge */}
              {goal.recommended && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-success to-success-light px-2 py-1 rounded-full text-xs font-bold text-white">
                  Recomendado
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center
                  bg-gradient-to-br ${goal.bgColor} border ${goal.borderColor}
                `}>
                  <goal.icon className="w-8 h-8 text-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-foreground">
                      {goal.title}
                    </h3>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${goal.difficulty === 'Extremo' ? 'bg-red-500/20 text-red-400' : 
                        goal.difficulty === 'Moderado' ? 'bg-blue-500/20 text-blue-400' : 
                        'bg-green-500/20 text-green-400'}
                    `}>
                      {goal.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">
                    {goal.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="font-medium text-primary">{goal.xpMultiplier} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gold">💰</span>
                      <span className="font-medium text-gold">{goal.coinBonus}</span>
                    </div>
                  </div>
                </div>

                {selectedGoal === goal.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedGoal && (
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-primary via-success to-primary text-white px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            <Target className="w-6 h-6" />
            Confirmar Meta
            <div className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
              +{selectedGoal === 'immediate' ? 150 : selectedGoal === 'gradual' ? 100 : 75} XP
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
