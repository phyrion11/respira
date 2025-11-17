import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Wind, Trophy, Zap, X } from 'lucide-react';

interface Challenge1BreathingProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const Challenge1Breathing = ({ userProfile, onUpdateProfile, onNext, onSkip }: Challenge1BreathingProps) => {
  const [phase, setPhase] = useState<'instructions' | 'challenge' | 'complete'>('instructions');
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(4);
  const [totalTime, setTotalTime] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const maxTime = 60; // 1 minute max
  const minTimeForPoints = 10; // minimum 10 seconds

  useEffect(() => {
    if (phase !== 'challenge') return;

    const interval = setInterval(() => {
      setTotalTime(prev => {
        if (prev >= maxTime) {
          setPhase('complete');
          return prev;
        }
        
        // Show skip button after 10 seconds
        if (prev >= minTimeForPoints && !showSkip) {
          setShowSkip(true);
        }
        
        return prev + 1;
      });

      setTimer(prev => {
        if (prev <= 1) {
          if (breathingPhase === 'inhale') {
            setBreathingPhase('hold');
            return 4;
          } else if (breathingPhase === 'hold') {
            setBreathingPhase('exhale');
            return 6;
          } else {
            setBreathingPhase('inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, breathingPhase, totalTime, showSkip]);

  const handleCollectPoints = () => {
    const points = Math.min(totalTime * 5, 300); // 5 XP per second, max 300
    const coins = Math.min(Math.floor(totalTime * 2), 120); // 2 coins per second, max 120
    
    onUpdateProfile({
      xp: userProfile.xp + points,
      respirCoins: userProfile.respirCoins + coins,
      badges: totalTime >= 60 ? [...userProfile.badges, 'Mestre da Respiração'] : userProfile.badges,
      completedChallenges: [...userProfile.completedChallenges, 'breathing-challenge-1']
    });
    onNext();
  };

  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-fade-up">
          {/* Challenge Header */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center mb-4 mx-auto animate-glow-pulse">
                <Wind className="w-12 h-12 text-background" />
              </div>
              <div className="absolute -top-2 -right-2 bg-warning text-background px-3 py-1 rounded-full text-xs font-bold">
                Nível 1
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground">
              Desafio: Respiração Vital
            </h2>
            <p className="text-muted-foreground text-lg">
              Controle sua respiração, controle seu destino
            </p>
          </div>

          {/* Instructions Card */}
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Como Funciona
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <p className="text-foreground/80">Siga o ritmo visual da respiração: inspire, segure, expire</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <p className="text-foreground/80">Quanto mais tempo você respirar, mais pontos ganha</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <p className="text-foreground/80">Mínimo 10 segundos para ganhar recompensas</p>
              </div>
            </div>

            {/* Rewards Preview */}
            <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl border border-success/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Recompensa Máxima:</span>
                <div className="flex items-center gap-3">
                  <span className="text-warning font-bold">+300 XP</span>
                  <span className="text-gold font-bold">+120 Coins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setPhase('challenge')}
            className="w-full bg-gradient-to-r from-primary via-success to-primary text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            <Zap className="w-5 h-5" />
            Começar Desafio
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-bounce-in text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-warning to-gold rounded-full flex items-center justify-center mb-4 mx-auto animate-success-burst">
            <Trophy className="w-16 h-16 text-background" />
          </div>
          
          <h2 className="text-4xl font-bold text-gradient-gold">
            Desafio Completo!
          </h2>
          
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-warning/10 rounded-2xl">
                <div className="text-3xl font-bold text-warning">+{Math.min(totalTime * 5, 300)}</div>
                <div className="text-sm text-muted-foreground">XP Ganho</div>
              </div>
              <div className="text-center p-4 bg-gold/10 rounded-2xl">
                <div className="text-3xl font-bold text-gold">+{Math.min(Math.floor(totalTime * 2), 120)}</div>
                <div className="text-sm text-muted-foreground">RespiCoins</div>
              </div>
            </div>
            
            <div className="text-foreground/80 text-sm">
              Você respirou por <span className="font-bold text-primary">{totalTime} segundos</span>
            </div>
          </div>

          <button
            onClick={handleCollectPoints}
            className="w-full bg-gradient-to-r from-primary via-success to-primary text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            Coletar Recompensas
          </button>
        </div>
      </div>
    );
  }

  // Challenge Phase
  const getPhaseText = () => {
    switch (breathingPhase) {
      case 'inhale': return 'INSPIRE';
      case 'hold': return 'SEGURE';
      case 'exhale': return 'EXPIRE';
    }
  };

  const getPhaseColor = () => {
    switch (breathingPhase) {
      case 'inhale': return 'from-primary to-primary-glow';
      case 'hold': return 'from-warning to-gold';
      case 'exhale': return 'from-success to-primary';
    }
  };

  const scaleValue = breathingPhase === 'inhale' ? 1.5 : breathingPhase === 'hold' ? 1.5 : 1;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Time Counter */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-6xl font-bold text-gradient-gold mb-2">
          {totalTime}s
        </div>
        <div className="text-muted-foreground">
          +{totalTime * 5} XP • +{Math.floor(totalTime * 2)} Coins
        </div>
      </div>

      {/* Breathing Circle */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <div 
            className={`w-64 h-64 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center transition-all duration-1000 ease-in-out shadow-2xl`}
            style={{ transform: `scale(${scaleValue})` }}
          >
            <div className="text-background text-center">
              <div className="text-3xl font-bold mb-2">{getPhaseText()}</div>
              <div className="text-6xl font-bold">{timer}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full max-w-md space-y-3 pb-8">
        {showSkip && (
          <>
            <button
              onClick={handleCollectPoints}
              className="w-full bg-gradient-to-r from-primary via-success to-primary text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              Concluir e Coletar: +{totalTime * 5} XP
            </button>
            
            <button
              onClick={onSkip}
              className="w-full glass-effect px-6 py-3 rounded-2xl font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Pular Desafio (Sem Recompensas)
            </button>
          </>
        )}
      </div>
    </div>
  );
};