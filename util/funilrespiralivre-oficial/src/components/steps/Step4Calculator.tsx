import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { StepWrapper } from '../StepWrapper';
import { Calculator, Cigarette, TrendingDown, Calendar, DollarSign } from 'lucide-react';

interface Step4CalculatorProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

export const Step4Calculator = ({ userProfile, onUpdateProfile, onNext }: Step4CalculatorProps) => {
  const [monthlySpend, setMonthlySpend] = useState(userProfile.monthlySpend || 300);
  const [isCalculated, setIsCalculated] = useState(false);
  
  const cigarettePrice = 12; // Preço médio do maço
  const dailyPacks = monthlySpend / cigarettePrice / 30;
  const yearlySpend = monthlySpend * 12;
  const dreamPrice = userProfile.selectedDream?.price || 0;
  const monthsToReachDream = dreamPrice / monthlySpend;

  useEffect(() => {
    if (monthlySpend > 0) {
      const timer = setTimeout(() => setIsCalculated(true), 500);
      return () => clearTimeout(timer);
    }
  }, [monthlySpend]);

  const handleSliderChange = (value: number) => {
    setMonthlySpend(value);
    onUpdateProfile({ monthlySpend: value });
  };

  const handleNext = () => {
    onUpdateProfile({ 
      xp: userProfile.xp + 30,
      badges: [...userProfile.badges, 'Calculador Realista'] 
    });
    onNext();
  };

  return (
    <StepWrapper 
      title="Hora da Realidade" 
      subtitle="Quanto você gasta com cigarro por mês?"
    >
      <div className="space-y-6">
        {/* Slider Premium */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient mb-2">
              R$ {monthlySpend.toLocaleString('pt-BR')}
            </div>
            <p className="text-muted-foreground">por mês</p>
          </div>

          <div className="relative">
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={monthlySpend}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-4 slider-premium appearance-none rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>R$ 50</span>
              <span>R$ 1.000</span>
            </div>
          </div>
        </div>

        {/* Impacto Cards */}
        {isCalculated && (
          <div className="space-y-4 fade-up-premium">
            {/* Consumo Diário */}
            <div className="premium-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-smoking/20 rounded-lg">
                  <Cigarette className="w-5 h-5 text-smoking" />
                </div>
                <h3 className="font-bold">Consumo Diário</h3>
              </div>
              <div className="text-2xl font-bold text-smoking">
                {dailyPacks.toFixed(1)} maços/dia
              </div>
              <p className="text-sm text-muted-foreground">
                Aproximadamente {(dailyPacks * 20).toFixed(0)} cigarros por dia
              </p>
            </div>

            {/* Gasto Anual */}
            <div className="premium-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-warning/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-warning" />
                </div>
                <h3 className="font-bold">Gasto Anual</h3>
              </div>
              <div className="text-2xl font-bold text-warning">
                R$ {yearlySpend.toLocaleString('pt-BR')}
              </div>
              <p className="text-sm text-muted-foreground">
                Em um ano você gasta isso com cigarro
              </p>
            </div>

            {/* Tempo para o Sonho */}
            <div className="premium-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-success/20 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-bold">Seu Sonho</h3>
              </div>
              <div className="text-2xl font-bold text-success">
                {monthsToReachDream.toFixed(1)} meses
              </div>
              <p className="text-sm text-muted-foreground">
                Parando de fumar, você realizaria {userProfile.selectedDream?.name}
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        {isCalculated && (
          <div className="fade-up-premium" style={{ animationDelay: '400ms' }}>
            <button
              onClick={handleNext}
              className="w-full button-premium flex items-center justify-center gap-3"
            >
              <Calculator className="w-5 h-5" />
              Continuar Jornada
              <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                +30 XP
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
          <div className="w-2 h-2 bg-muted rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
        </div>
      </div>
    </StepWrapper>
  );
};