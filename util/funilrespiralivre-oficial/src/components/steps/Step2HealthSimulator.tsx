import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Cigarette, Heart, TrendingDown, Coins, Calendar } from 'lucide-react';

interface Step2HealthSimulatorProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

export const Step2HealthSimulator = ({ userProfile, onUpdateProfile, onNext }: Step2HealthSimulatorProps) => {
  const [currentSpend, setCurrentSpend] = useState(300);
  const [isSimulating, setIsSimulating] = useState(false);
  const [healthScore, setHealthScore] = useState(100);
  const [walletDamage, setWalletDamage] = useState(0);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setHealthScore(prev => Math.max(20, prev - 2));
        setWalletDamage(prev => prev + currentSpend / 30);
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setIsSimulating(false);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSimulating, currentSpend]);

  const startSimulation = () => {
    setIsSimulating(true);
    setHealthScore(100);
    setWalletDamage(0);
  };

  const handleNext = () => {
    onUpdateProfile({ 
      monthlySpend: currentSpend,
      xp: userProfile.xp + 75,
      badges: [...userProfile.badges, 'Realista Corajoso'] 
    });
    onNext();
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background relative overflow-hidden">
      <div className="relative z-10 p-4">
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-smoking/20 to-warning/20 rounded-full border border-smoking/30 mb-4">
            <span className="text-sm font-bold text-smoking">SIMULADOR DE IMPACTO</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Medidor de Dano
          </h1>
          <p className="text-muted-foreground">Veja o impacto real do cigarro</p>
        </div>

        {/* Spend Slider */}
        <div className="max-w-sm mx-auto mb-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gradient mb-1">
              R$ {currentSpend}
            </div>
            <p className="text-sm text-muted-foreground">gasto mensal com cigarro</p>
          </div>
          
          <input
            type="range"
            min="100"
            max="800"
            step="50"
            value={currentSpend}
            onChange={(e) => setCurrentSpend(Number(e.target.value))}
            className="w-full h-4 slider-premium appearance-none rounded-full cursor-pointer"
          />
        </div>

        {/* Health & Wallet Meters */}
        <div className="max-w-sm mx-auto mb-6 space-y-4">
          {/* Health Meter */}
          <div className="premium-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-bold">Saúde</span>
              </div>
              <span className="text-xl font-bold text-red-500">{healthScore.toFixed(0)}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>

          {/* Wallet Damage */}
          <div className="premium-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-gold" />
                <span className="font-bold">Dinheiro Perdido</span>
              </div>
              <span className="text-xl font-bold text-gold">R$ {walletDamage.toFixed(0)}</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold to-warning transition-all duration-300"
                style={{ width: `${Math.min(100, (walletDamage / currentSpend) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Simulation Button */}
        <div className="max-w-sm mx-auto mb-6">
          <button
            onClick={startSimulation}
            disabled={isSimulating}
            className={`
              w-full premium-card p-6 cursor-pointer transition-all duration-300
              ${isSimulating ? 'opacity-50' : 'hover:scale-105'}
              bg-gradient-to-r from-smoking/20 to-warning/20 border-smoking/30
            `}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">
                <Cigarette className="w-12 h-12 mx-auto text-smoking" />
              </div>
              <h3 className="font-bold text-lg text-smoking mb-2">
                {isSimulating ? 'Simulando Dano...' : 'Simular 1 Mês Fumando'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isSimulating ? 'Calculando impacto...' : 'Toque para ver o efeito acumulado'}
              </p>
            </div>
          </button>
        </div>

        {/* Impact Stats */}
        {!isSimulating && walletDamage > 0 && (
          <div className="max-w-sm mx-auto fade-up-premium">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="premium-card p-3 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-warning" />
                <div className="text-lg font-bold text-warning">
                  {(365 / (currentSpend / 12)).toFixed(0)}
                </div>
                <p className="text-xs text-muted-foreground">dias para R$ 1k</p>
              </div>
              
              <div className="premium-card p-3 text-center">
                <TrendingDown className="w-6 h-6 mx-auto mb-2 text-success" />
                <div className="text-lg font-bold text-success">
                  {((100 - healthScore) / 2).toFixed(0)}%
                </div>
                <p className="text-xs text-muted-foreground">capacidade perdida</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full button-premium flex items-center justify-center gap-3"
            >
              Escolher Meu Objetivo
              <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                +75 XP
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};