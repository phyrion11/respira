
import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Cigarette, DollarSign, Calendar, Heart, TrendingDown, Play } from 'lucide-react';

interface Step2RealityCheckProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

export const Step2RealityCheck = ({ userProfile, onUpdateProfile, onNext }: Step2RealityCheckProps) => {
  const [dailyCigarettes, setDailyCigarettes] = useState(20);
  const [cigarettePrice, setCigarettePrice] = useState(12);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const monthlySpend = (dailyCigarettes * cigarettePrice * 30) / 20; // maços por mês
  const yearlySpend = monthlySpend * 12;
  const lifeTimeSpend = yearlySpend * 20; // próximos 20 anos

  const startSimulation = () => {
    setIsSimulating(true);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setSimulationStep(step);
      if (step >= 4) {
        clearInterval(timer);
        setTimeout(() => {
          onUpdateProfile({
            dailyCigarettes,
            cigarettePrice,
            xp: userProfile.xp + 75,
            respirCoins: userProfile.respirCoins + 50,
            badges: [...userProfile.badges, 'Realista Corajoso']
          });
          onNext();
        }, 2000);
      }
    }, 1500);
  };

  if (isSimulating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-smoking/10 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center space-y-6 animate-fade-up">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-destructive to-smoking rounded-3xl flex items-center justify-center mx-auto animate-glow-pulse">
              <TrendingDown className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gradient mb-8">
            Analisando seu perfil...
          </h2>
          
          <div className="space-y-6">
            {/* Step 1: Consumo */}
            <div className={`premium-card p-6 transition-all duration-500 ${simulationStep >= 1 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 82, 82, 0.2) 0%, rgba(255, 82, 82, 0.05) 100%)',
                    boxShadow: '0 8px 16px rgba(255, 82, 82, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Cigarette className="w-7 h-7 text-smoking" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Consumo Diário</h3>
                  <p className="text-2xl font-bold text-smoking">{dailyCigarettes} cigarros</p>
                </div>
              </div>
            </div>

            {/* Step 2: Gasto */}
            <div className={`premium-card p-6 transition-all duration-500 ${simulationStep >= 2 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 193, 7, 0.05) 100%)',
                    boxShadow: '0 8px 16px rgba(255, 193, 7, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <DollarSign className="w-7 h-7 text-warning" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Gasto Mensal</h3>
                  <p className="text-2xl font-bold text-warning">R$ {monthlySpend.toFixed(0)}</p>
                </div>
              </div>
            </div>

            {/* Step 3: Impacto */}
            <div className={`premium-card p-6 transition-all duration-500 ${simulationStep >= 3 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%)',
                    boxShadow: '0 8px 16px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Heart className="w-7 h-7 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Impacto na Saúde</h3>
                  <p className="text-lg font-bold text-destructive">Alto Risco</p>
                </div>
              </div>
            </div>

            {/* Step 4: Potencial */}
            <div className={`premium-card p-6 bg-gradient-to-r from-success/20 to-primary/20 border-success/30 transition-all duration-500 ${simulationStep >= 4 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-xl text-success mb-2">
                  Potencial de Economia
                </h3>
                <p className="text-3xl font-bold text-success">
                  R$ {yearlySpend.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-muted-foreground">por ano</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
        
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-3xl font-bold text-gradient mb-4">
            Hora da Realidade
          </h1>
          <p className="text-muted-foreground">
            Vamos calcular seu perfil de consumo para criar sua jornada personalizada
          </p>
        </div>

        <div className="space-y-6">
          {/* Cigarettes per day */}
          <div className="premium-card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Cigarette className="w-5 h-5 text-smoking" />
              Quantos cigarros por dia?
            </h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-smoking">{dailyCigarettes}</div>
              <p className="text-sm text-muted-foreground">cigarros por dia</p>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              value={dailyCigarettes}
              onChange={(e) => setDailyCigarettes(Number(e.target.value))}
              className="w-full h-4 slider-premium"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1</span>
              <span>60+</span>
            </div>
          </div>

          {/* Cigarette price */}
          <div className="premium-card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-warning" />
              Preço do maço
            </h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-warning">R$ {cigarettePrice}</div>
            </div>
            <input
              type="range"
              min="8"
              max="25"
              value={cigarettePrice}
              onChange={(e) => setCigarettePrice(Number(e.target.value))}
              className="w-full h-4 slider-premium"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>R$ 8</span>
              <span>R$ 25</span>
            </div>
          </div>

          {/* Preview Impact */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-warning/20 to-destructive/20 rounded-xl p-4 border border-warning/30">
              <div className="text-center">
                <Calendar className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-lg font-bold text-warning">
                  R$ {monthlySpend.toFixed(0)}
                </div>
                <p className="text-xs text-muted-foreground">por mês</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-destructive/20 to-smoking/20 rounded-xl p-4 border border-destructive/30">
              <div className="text-center">
                <TrendingDown className="w-8 h-8 text-destructive mx-auto mb-2" />
                <div className="text-lg font-bold text-destructive">
                  R$ {(lifeTimeSpend/1000).toFixed(0)}k
                </div>
                <p className="text-xs text-muted-foreground">em 20 anos</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={startSimulation}
          className="w-full mt-8 bg-gradient-to-r from-primary via-success to-primary text-white px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          <Play className="w-6 h-6" />
          Analisar Meu Perfil
          <div className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
            +75 XP
          </div>
        </button>
      </div>
    </div>
  );
};
