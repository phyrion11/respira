import { useState } from 'react';
import { UserProfile } from '@/types/funnel';
import { StepWrapper } from '../StepWrapper';
import { 
  Calendar, 
  Users, 
  Phone, 
  Book, 
  CheckCircle, 
  Rocket 
} from 'lucide-react';

interface Step6StrategyProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

const strategies = [
  {
    id: 'gradual',
    icon: Calendar,
    title: 'Redução Gradual',
    description: 'Diminuir progressivamente até parar completamente',
    recommended: true
  },
  {
    id: 'immediate',
    icon: Rocket,
    title: 'Parar Imediatamente',
    description: 'Parar de uma vez e focar na força de vontade',
    recommended: false
  },
  {
    id: 'support',
    icon: Users,
    title: 'Grupo de Apoio',
    description: 'Buscar ajuda de outras pessoas na mesma jornada',
    recommended: true
  },
  {
    id: 'professional',
    icon: Phone,
    title: 'Ajuda Profissional',
    description: 'Acompanhamento médico ou psicológico',
    recommended: true
  },
  {
    id: 'reading',
    icon: Book,
    title: 'Educação Contínua',
    description: 'Ler livros e materiais sobre como parar de fumar',
    recommended: false
  }
];

export const Step6Strategy = ({ userProfile, onUpdateProfile, onNext }: Step6StrategyProps) => {
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);

  const handleStrategyToggle = (strategyId: string) => {
    setSelectedStrategies(prev => {
      const newSelection = prev.includes(strategyId)
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId];
      
      return newSelection;
    });
  };

  const handleNext = () => {
    onUpdateProfile({ 
      xp: userProfile.xp + 40,
      badges: [...userProfile.badges, 'Estrategista Preparado'] 
    });
    onNext();
  };

  return (
    <StepWrapper 
      title="Sua Estratégia" 
      subtitle="Como você quer abordar sua jornada?"
    >
      <div className="space-y-6">
        {/* Strategies List */}
        <div className="space-y-4">
          {strategies.map((strategy, index) => (
            <div
              key={strategy.id}
              onClick={() => handleStrategyToggle(strategy.id)}
              className={`
                premium-card p-5 cursor-pointer transition-all duration-300
                ${selectedStrategies.includes(strategy.id)
                  ? 'border-primary/50 shadow-[var(--shadow-glow)] scale-[1.02]' 
                  : 'hover:border-primary/30 hover:scale-[1.01]'
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center
                  ${strategy.recommended 
                    ? 'bg-gradient-to-br from-success/20 to-primary/20' 
                    : 'bg-gradient-to-br from-muted/20 to-secondary/20'
                  }
                  border border-white/10
                `}>
                  <strategy.icon className="w-6 h-6 text-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-foreground">
                      {strategy.title}
                    </h3>
                    {strategy.recommended && (
                      <span className="challenge-badge text-xs">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {strategy.description}
                  </p>
                </div>

                {selectedStrategies.includes(strategy.id) && (
                  <CheckCircle className="w-6 h-6 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Success Tip */}
        <div className="premium-card p-6 bg-gradient-to-r from-success/20 to-primary/20 border-success/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground mb-2">
                Dica de Sucesso
              </h3>
              <p className="text-muted-foreground text-sm">
                Combinar múltiplas estratégias aumenta suas chances de sucesso. 
                A redução gradual com apoio profissional tem as maiores taxas de êxito.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {selectedStrategies.length > 0 && (
          <div className="fade-up-premium">
            <button
              onClick={handleNext}
              className="w-full button-premium flex items-center justify-center gap-3"
            >
              <Rocket className="w-5 h-5" />
              Finalizar Planejamento
              <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                +40 XP
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
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
        </div>
      </div>
    </StepWrapper>
  );
};