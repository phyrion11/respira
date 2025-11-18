import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Cigarette, DollarSign, Calendar, Heart, TrendingDown, Play, AlertTriangle, Target } from 'lucide-react';

interface Step2RealityCheckProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack?: () => void;
}

const Step2RealityCheck = ({ userProfile, onUpdateProfile, onNext, onBack }: Step2RealityCheckProps) => {
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
            monthlySpend,
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
        <div className="max-w-md mx-auto text-center">
          <div className="premium-card p-6 mb-6">
            <Target className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
            <h2 className="text-3xl font-bold text-gradient mb-8">
              Analisando seu perfil...
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Step 1: Consumo */}
            <div className={`premium-card p-6 transition-all duration-500 ${simulationStep >= 1 ? 'opacity-100 scale-100 animate-badge-unlock' : 'opacity-50 scale-95'}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 premium-card bg-gradient-to-br from-smoking/20 to-smoking/10 border-smoking/30 flex items-center justify-center">
                  <Cigarette className="w-8 h-8 text-smoking" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-xl text-foreground">Consumo Diário</h3>
                  <p className="text-3xl font-black text-smoking">{dailyCigarettes} cigarros</p>
                </div>
              </div>
            </div>

            {/* Step 2: Gasto */}
            <div className={`premium-card p-6 transition-all duration-500 ${simulationStep >= 2 ? 'opacity-100 scale-100 animate-badge-unlock' : 'opacity-50 scale-95'}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 premium-card bg-gradient-to-br from-warning/20 to-warning/10 border-warning/30 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-warning" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-xl text-foreground">Gasto Mensal</h3>
                  <p className="text-3xl font-black text-warning">R$ {monthlySpend.toFixed(0)}</p>
                </div>
              </div>
            </div>

            {/* Step 3: Impacto */}
            <div className={`premium-card p-6 transition-all duration-500 ${simulationStep >= 3 ? 'opacity-100 scale-100 animate-badge-unlock' : 'opacity-50 scale-95'}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 premium-card bg-gradient-to-br from-destructive/20 to-destructive/10 border-destructive/30 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-xl text-foreground">Impacto na Saúde</h3>
                  <p className="text-2xl font-black text-destructive">Alto Risco</p>
                </div>
              </div>
            </div>

            {/* Step 4: Potencial */}
            <div className={`premium-card p-6 bg-gradient-to-br from-success/20 to-primary/20 border-success/30 transition-all duration-500 ${simulationStep >= 4 ? 'opacity-100 scale-100 animate-badge-unlock' : 'opacity-50 scale-95'}`}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 premium-card bg-gradient-to-br from-success/30 to-primary/30 border-success/40 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-bold text-2xl text-success mb-2">
                  Potencial de Economia
                </h3>
                <p className="text-4xl font-black text-success mb-2">
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
          <div className="w-16 h-16 mx-auto mb-4 premium-card bg-gradient-to-br from-primary/20 to-success/20 border-primary/30 flex items-center justify-center">
            <Target className="w-8 h-8 text-primary" />
          </div>
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
            <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
              <div className="w-10 h-10 premium-card bg-gradient-to-br from-smoking/20 to-smoking/10 border-smoking/30 flex items-center justify-center">
                <Cigarette className="w-5 h-5 text-smoking" />
              </div>
              Quantos cigarros por dia?
            </h3>
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-smoking mb-2">{dailyCigarettes}</div>
              <p className="text-sm text-muted-foreground">cigarros por dia</p>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              value={dailyCigarettes}
              onChange={(e) => setDailyCigarettes(Number(e.target.value))}
              className="slider-premium w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1</span>
              <span>60+</span>
            </div>
          </div>

          {/* Cigarette price */}
          <div className="premium-card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
              <div className="w-10 h-10 premium-card bg-gradient-to-br from-warning/20 to-warning/10 border-warning/30 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-warning" />
              </div>
              Preço do maço
            </h3>
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-warning mb-2">R$ {cigarettePrice}</div>
            </div>
            <input
              type="range"
              min="8"
              max="25"
              value={cigarettePrice}
              onChange={(e) => setCigarettePrice(Number(e.target.value))}
              className="slider-premium w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>R$ 8</span>
              <span>R$ 25</span>
            </div>
          </div>

          {/* Preview Impact */}
          <div className="grid grid-cols-2 gap-4">
            <div className="premium-card p-4 bg-gradient-to-br from-warning/20 to-destructive/20 border-warning/30">
              <div className="text-center">
                <Calendar className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-xl font-black text-warning">
                  R$ {monthlySpend.toFixed(0)}
                </div>
                <p className="text-xs text-muted-foreground">por mês</p>
              </div>
            </div>
            
            <div className="premium-card p-4 bg-gradient-to-br from-destructive/20 to-smoking/20 border-destructive/30">
              <div className="text-center">
                <TrendingDown className="w-8 h-8 text-destructive mx-auto mb-2" />
                <div className="text-xl font-black text-destructive">
                  R$ {(lifeTimeSpend/1000).toFixed(0)}k
                </div>
                <p className="text-xs text-muted-foreground">em 20 anos</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={startSimulation}
          className="w-full mt-8 premium-button text-lg flex items-center justify-center gap-3"
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

export default Step2RealityCheck;