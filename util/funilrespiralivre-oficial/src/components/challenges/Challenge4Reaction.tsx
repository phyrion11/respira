import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Zap, Trophy, X, Hand } from 'lucide-react';

interface Challenge4ReactionProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const Challenge4Reaction = ({ userProfile, onUpdateProfile, onNext, onSkip }: Challenge4ReactionProps) => {
  const [phase, setPhase] = useState<'instructions' | 'waiting' | 'ready' | 'complete' | 'failed'>('instructions');
  const [countdown, setCountdown] = useState(15);
  const [reactionTime, setReactionTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (phase === 'waiting') {
      // Random delay between 2-5 seconds
      const delay = Math.random() * 3000 + 2000;
      const timer = setTimeout(() => {
        setPhase('ready');
        setStartTime(Date.now());
        // Start countdown
        setCountdown(15);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'ready') return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setPhase('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const handleTap = () => {
    if (phase === 'waiting') {
      // Tapped too early
      setPhase('failed');
      return;
    }

    if (phase === 'ready') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setPhase('complete');
    }
  };

  const startChallenge = () => {
    setPhase('waiting');
    setReactionTime(0);
    setCountdown(15);
  };

  const handleCollectPoints = () => {
    // Bonus for fast reaction
    const bonus = reactionTime < 500 ? 50 : reactionTime < 1000 ? 25 : 0;
    
    onUpdateProfile({
      xp: userProfile.xp + 250 + bonus,
      respirCoins: userProfile.respirCoins + 125 + (bonus / 2),
      badges: reactionTime < 500 
        ? [...userProfile.badges, 'Reflexos de Gato', 'Velocista']
        : [...userProfile.badges, 'Reflexos de Gato'],
      completedChallenges: [...userProfile.completedChallenges, 'reaction-challenge-4']
    });
    onNext();
  };

  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-fade-up">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-4 mx-auto animate-glow-pulse">
                <Zap className="w-12 h-12 text-background" />
              </div>
              <div className="absolute -top-2 -right-2 bg-destructive text-background px-3 py-1 rounded-full text-xs font-bold">
                Nível 4
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground">
              Desafio: Reflexo Rápido
            </h2>
            <p className="text-muted-foreground text-lg">
              Reaja rápido, domine seus impulsos
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Como Funciona
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-500 font-bold text-sm">1</span>
                </div>
                <p className="text-foreground/80">Aguarde a tela ficar verde</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-500 font-bold text-sm">2</span>
                </div>
                <p className="text-foreground/80">Quando aparecer, toque o mais rápido possível</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-500 font-bold text-sm">3</span>
                </div>
                <p className="text-foreground/80 font-bold text-destructive">ATENÇÃO: Não toque antes da hora!</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Recompensa:</span>
                <div className="flex items-center gap-3">
                  <span className="text-blue-500 font-bold">+250 XP</span>
                  <span className="text-gold font-bold">+125 Coins</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-warning">
                +50 XP bônus se reagir em menos de 0.5s!
              </div>
            </div>
          </div>

          <button
            onClick={startChallenge}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Começar Desafio
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'failed') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-fade-up text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-destructive to-smoking rounded-full flex items-center justify-center mb-4 mx-auto">
            <X className="w-16 h-16 text-background" />
          </div>
          
          <h2 className="text-4xl font-bold text-destructive">
            Ops! Muito ansioso...
          </h2>
          
          <p className="text-muted-foreground">
            Aguarde o sinal verde aparecer antes de tocar!
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={startChallenge}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
            >
              Tentar Novamente
            </button>
            
            <button
              onClick={onSkip}
              className="w-full glass-effect px-6 py-3 rounded-2xl font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pular Desafio (Sem Recompensas)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    const bonus = reactionTime < 500 ? 50 : reactionTime < 1000 ? 25 : 0;
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-bounce-in text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-success-burst">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Reflexos Incríveis!
          </h2>
          
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl mb-4">
              <div className="text-5xl font-bold text-blue-500">{reactionTime}ms</div>
              <div className="text-sm text-muted-foreground">Tempo de Reação</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-500/10 rounded-2xl">
                <div className="text-3xl font-bold text-blue-500">+{250 + bonus}</div>
                <div className="text-sm text-muted-foreground">XP Ganho</div>
              </div>
              <div className="text-center p-4 bg-gold/10 rounded-2xl">
                <div className="text-3xl font-bold text-gold">+{125 + (bonus / 2)}</div>
                <div className="text-sm text-muted-foreground">RespiCoins</div>
              </div>
            </div>
            
            {bonus > 0 && (
              <div className="p-4 bg-warning/10 rounded-2xl border border-warning/20">
                <p className="text-warning font-bold">⚡ BÔNUS DE VELOCIDADE: +{bonus} XP!</p>
              </div>
            )}
            
            <div className="p-4 bg-success/10 rounded-2xl border border-success/20">
              <p className="text-success font-bold">🏆 Badge Desbloqueado: Reflexos de Gato</p>
            </div>
          </div>

          <button
            onClick={handleCollectPoints}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/30"
          >
            Coletar Recompensas
          </button>
        </div>
      </div>
    );
  }

  // Waiting or Ready Phase
  const bgColor = phase === 'ready' ? 'bg-success' : 'bg-destructive';
  const text = phase === 'waiting' ? 'AGUARDE...' : 'TOQUE AGORA!';

  return (
    <button
      onClick={handleTap}
      className={`min-h-screen w-full ${bgColor} flex flex-col items-center justify-center p-4 transition-colors duration-300`}
    >
      <div className="text-center space-y-8">
        {phase === 'ready' ? (
          <>
            <Hand className="w-32 h-32 text-background mx-auto animate-pulse" />
            <div className="text-6xl font-bold text-background animate-bounce">
              {text}
            </div>
            <div className="text-4xl font-bold text-background/80">
              {countdown}s
            </div>
          </>
        ) : (
          <>
            <div className="w-32 h-32 rounded-full bg-background/20 mx-auto animate-pulse" />
            <div className="text-4xl font-bold text-background">
              {text}
            </div>
          </>
        )}
      </div>
    </button>
  );
};