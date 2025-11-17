import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Target, Trophy, Zap, X } from 'lucide-react';

interface Challenge2FocusProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const Challenge2Focus = ({ userProfile, onUpdateProfile, onNext, onSkip }: Challenge2FocusProps) => {
  const [phase, setPhase] = useState<'instructions' | 'challenge' | 'complete'>('instructions');
  const [countdown, setCountdown] = useState(15);
  const [targetHit, setTargetHit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (phase !== 'challenge' || targetHit) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Failed - time's up
          onSkip();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, targetHit, onSkip]);

  const handleTargetClick = () => {
    if (targetHit) return;
    
    setTargetHit(true);
    setShowSuccess(true);
    
    setTimeout(() => {
      setPhase('complete');
    }, 1500);
  };

  const handleCollectPoints = () => {
    onUpdateProfile({
      xp: userProfile.xp + 150,
      respirCoins: userProfile.respirCoins + 75,
      badges: [...userProfile.badges, 'Foco de Águia'],
      completedChallenges: [...userProfile.completedChallenges, 'focus-challenge-2']
    });
    onNext();
  };

  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-fade-up">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-warning to-gold rounded-3xl flex items-center justify-center mb-4 mx-auto animate-glow-pulse">
                <Target className="w-12 h-12 text-background" />
              </div>
              <div className="absolute -top-2 -right-2 bg-destructive text-background px-3 py-1 rounded-full text-xs font-bold">
                Nível 2
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground">
              Desafio: Foco Laser
            </h2>
            <p className="text-muted-foreground text-lg">
              Mantenha o foco, destr oia a distração
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              Como Funciona
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-warning font-bold text-sm">1</span>
                </div>
                <p className="text-foreground/80">Um alvo aparecerá na tela</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-warning font-bold text-sm">2</span>
                </div>
                <p className="text-foreground/80">Você tem 15 segundos para acertá-lo</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-warning font-bold text-sm">3</span>
                </div>
                <p className="text-foreground/80">Mantenha o foco! Não deixe a ansiedade vencer</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-warning/10 to-gold/10 rounded-2xl border border-warning/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Recompensa:</span>
                <div className="flex items-center gap-3">
                  <span className="text-warning font-bold">+150 XP</span>
                  <span className="text-gold font-bold">+75 Coins</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase('challenge')}
            className="w-full bg-gradient-to-r from-warning to-gold text-background px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-warning/30 flex items-center justify-center gap-2"
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
            Foco Perfeito!
          </h2>
          
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-warning/10 rounded-2xl">
                <div className="text-3xl font-bold text-warning">+150</div>
                <div className="text-sm text-muted-foreground">XP Ganho</div>
              </div>
              <div className="text-center p-4 bg-gold/10 rounded-2xl">
                <div className="text-3xl font-bold text-gold">+75</div>
                <div className="text-sm text-muted-foreground">RespiCoins</div>
              </div>
            </div>
            
            <div className="p-4 bg-success/10 rounded-2xl border border-success/20">
              <p className="text-success font-bold">🏆 Badge Desbloqueado: Foco de Águia</p>
            </div>
          </div>

          <button
            onClick={handleCollectPoints}
            className="w-full bg-gradient-to-r from-warning to-gold text-background px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-warning/30"
          >
            Coletar Recompensas
          </button>
        </div>
      </div>
    );
  }

  // Challenge Phase
  const getCountdownColor = () => {
    if (countdown > 10) return 'text-success';
    if (countdown > 5) return 'text-warning';
    return 'text-destructive animate-pulse';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Countdown */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className={`text-6xl font-bold ${getCountdownColor()} transition-colors duration-300`}>
          {countdown}s
        </div>
        <div className="text-muted-foreground">Tempo Restante</div>
      </div>

      {/* Target Button */}
      <div className="flex-1 flex items-center justify-center">
        {!targetHit ? (
          <button
            onClick={handleTargetClick}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-warning to-gold rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="relative w-48 h-48 bg-gradient-to-br from-warning to-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl">
              <Target className="w-24 h-24 text-background" />
            </div>
          </button>
        ) : (
          <div className="w-48 h-48 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center animate-success-burst shadow-2xl">
            <Trophy className="w-24 h-24 text-background" />
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-8xl font-bold text-success animate-bounce-in">
            PERFEITO!
          </div>
        </div>
      )}

      {/* Skip Button */}
      <div className="w-full max-w-md pb-8">
        <button
          onClick={onSkip}
          className="w-full glass-effect px-6 py-3 rounded-2xl font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          Pular Desafio (Sem Recompensas)
        </button>
      </div>
    </div>
  );
};