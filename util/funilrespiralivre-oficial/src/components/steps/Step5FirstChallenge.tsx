
import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Zap, Timer, CheckCircle, Repeat, ArrowRight } from 'lucide-react';

interface Step5FirstChallengeProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

export const Step5FirstChallenge = ({ userProfile, onUpdateProfile, onNext }: Step5FirstChallengeProps) => {
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [timer, setTimer] = useState(4);
  const [challengeComplete, setChallengeComplete] = useState(false);

  const totalCycles = 5;
  const phaseTimings = { inhale: 4, hold: 4, exhale: 6 };

  useEffect(() => {
    if (!challengeStarted) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // Move to next phase
          if (breathingPhase === 'inhale') {
            setBreathingPhase('hold');
            return phaseTimings.hold;
          } else if (breathingPhase === 'hold') {
            setBreathingPhase('exhale');
            return phaseTimings.exhale;
          } else {
            // Complete cycle
            const newCount = cycleCount + 1;
            setCycleCount(newCount);
            
            if (newCount >= totalCycles) {
              setChallengeComplete(true);
              return 0;
            } else {
              setBreathingPhase('inhale');
              return phaseTimings.inhale;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [challengeStarted, breathingPhase, cycleCount]);

  const startChallenge = () => {
    setChallengeStarted(true);
    setTimer(phaseTimings.inhale);
  };

  const handleComplete = () => {
    onUpdateProfile({
      xp: userProfile.xp + 125,
      respirCoins: userProfile.respirCoins + 100,
      badges: [...userProfile.badges, 'Primeiro Desafio', 'Mestre da Respiração'],
      completedChallenges: ['breathing-basics']
    });
    onNext();
  };

  if (challengeComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-6 animate-bounce">🏆</div>
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Desafio Completo!
          </h2>
          <div className="premium-card p-6 bg-gradient-to-r from-success/20 to-primary/20 border-success/30 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+125</div>
                <div className="text-sm text-muted-foreground">XP Ganho</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">+100</div>
                <div className="text-sm text-muted-foreground">RespiCoins</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-bold text-success">2 Badges Desbloqueados</span>
            </div>
          </div>
          
          <div className="space-y-3 text-sm text-muted-foreground mb-6">
            <p>✅ Técnica de respiração 4-4-6 dominada</p>
            <p>✅ Primeiro passo para controlar a ansiedade</p>
            <p>✅ Ferramenta anti-recaída desbloqueada</p>
          </div>

          <button
            onClick={handleComplete}
            className="w-full bg-gradient-to-r from-success to-primary text-white px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg"
          >
            <ArrowRight className="w-6 h-6" />
            Continuar Jornada
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
        
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🫁</div>
          <h1 className="text-3xl font-bold text-gradient mb-4">
            Primeiro Desafio
          </h1>
          <p className="text-muted-foreground">
            Aprenda a técnica de respiração 4-4-6 que reduz ansiedade em 60%
          </p>
        </div>

        {!challengeStarted ? (
          <>
            {/* Challenge Preview */}
            <div className="premium-card p-6 mb-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-4">Respiração Anti-Ansiedade</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-500 font-bold">4s</span>
                    </div>
                    <div className="text-blue-500 font-bold">Inspire</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-500 font-bold">4s</span>
                    </div>
                    <div className="text-purple-500 font-bold">Segure</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-500 font-bold">6s</span>
                    </div>
                    <div className="text-green-500 font-bold">Expire</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <h4 className="font-bold text-primary mb-2">Recompensas</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>+125 XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold">💰</span>
                    <span>+100 Coins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>2 Badges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Repeat className="w-4 h-4 text-dream" />
                    <span>Tool Desbloqueada</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startChallenge}
              className="w-full bg-gradient-to-r from-primary via-success to-primary text-white px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              <Timer className="w-6 h-6" />
              Iniciar Desafio
            </button>
          </>
        ) : (
          /* Active Challenge */
          <div className="text-center">
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-2">
                Ciclo {cycleCount + 1} de {totalCycles}
              </div>
              <div className="w-4 h-2 bg-muted rounded-full mx-auto mb-6">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${((cycleCount + 1) / totalCycles) * 100}%` }}
                />
              </div>
            </div>

            {/* Breathing Circle */}
            <div className="relative mx-auto mb-8" style={{ width: '200px', height: '200px' }}>
              <div 
                className={`
                  w-full h-full rounded-full border-4 transition-all duration-1000 ease-in-out
                  ${breathingPhase === 'inhale' ? 'scale-110 border-blue-500 bg-blue-500/20' :
                    breathingPhase === 'hold' ? 'scale-110 border-purple-500 bg-purple-500/20' :
                    'scale-90 border-green-500 bg-green-500/20'}
                `}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {timer}
                </div>
                <div className={`
                  text-lg font-bold capitalize
                  ${breathingPhase === 'inhale' ? 'text-blue-500' :
                    breathingPhase === 'hold' ? 'text-purple-500' :
                    'text-green-500'}
                `}>
                  {breathingPhase === 'inhale' ? 'Inspire' :
                   breathingPhase === 'hold' ? 'Segure' : 'Expire'}
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Siga o ritmo do círculo e respire profundamente
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
