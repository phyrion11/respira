import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Wind, Play, Pause, SkipForward, Trophy, Timer, Zap } from 'lucide-react';
import { StepWrapper } from '../StepWrapper';

interface Step6BreathingChallengeProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack?: () => void;
}

const Step6BreathingChallenge = ({ userProfile, onUpdateProfile, onNext, onBack }: Step6BreathingChallengeProps) => {
  const [phase, setPhase] = useState<'instructions' | 'challenge' | 'completed'>('instructions');
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreatheCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const MINIMUM_TIME = 10; // 10 seconds minimum
  const BREATH_CYCLE = 8; // 4 seconds each phase

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && phase === 'challenge') {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          
          // Show skip button after minimum time
          if (newTime >= MINIMUM_TIME) {
            setShowSkip(true);
          }
          
          // Calculate points (more points for longer duration)
          if (newTime >= MINIMUM_TIME) {
            const bonusPoints = Math.floor((newTime - MINIMUM_TIME) / 5) * 10;
            setPoints(100 + bonusPoints);
          }
          
          return newTime;
        });
        
        // Breath cycle animation
        const cyclePosition = timeElapsed % BREATH_CYCLE;
        if (cyclePosition < 3) {
          setBreathPhase('inhale');
        } else if (cyclePosition < 5) {
          setBreathPhase('hold');
        } else {
          setBreathPhase('exhale');
        }
        
        // Count completed breaths
        if (timeElapsed % BREATH_CYCLE === 0 && timeElapsed > 0) {
          setBreatheCount(prev => prev + 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, phase, timeElapsed]);

  const handleStart = () => {
    setPhase('challenge');
    setIsActive(true);
    setTimeElapsed(0);
    setBreatheCount(0);
    setPoints(0);
    setShowSkip(false);
  };

  const handleSkip = () => {
    if (timeElapsed < MINIMUM_TIME) {
      // No points if skipped too early
      completeChallenge(0);
    } else {
      completeChallenge(points);
    }
  };

  const handleComplete = () => {
    completeChallenge(points);
  };

  const completeChallenge = (earnedPoints: number) => {
    setIsActive(false);
    setPhase('completed');
    
    setTimeout(() => {
      onUpdateProfile({
        xp: userProfile.xp + earnedPoints,
        respirCoins: userProfile.respirCoins + Math.floor(earnedPoints / 2),
        badges: earnedPoints > 0 ? [...userProfile.badges, 'Mestre da Respiração'] : userProfile.badges
      });
      onNext();
    }, 2000);
  };

  if (phase === 'instructions') {
    return (
      <StepWrapper 
        title="🌬️ Desafio da Respiração"
        subtitle="Pratique respiração consciente e ganhe pontos"
        onBack={onBack}
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 premium-card bg-gradient-to-br from-primary/20 to-success/20 border-primary/30 flex items-center justify-center animate-float">
              <Wind className="w-10 h-10 text-primary" />
            </div>
            <p className="text-muted-foreground mb-2">
              Nível 1 • Dificuldade: Iniciante
            </p>
          </div>

          <div className="premium-card p-6 mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Como Funcionar:</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 premium-card bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <p>Respire profundamente seguindo o ritmo visual</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 premium-card bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <p>Mantenha o foco por pelo menos 10 segundos</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 premium-card bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <p>Quanto mais tempo, mais pontos você ganha!</p>
              </div>
            </div>
          </div>

          <div className="premium-card p-4 mb-6 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
            <h3 className="font-bold text-success mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recompensas Possíveis
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <div className="text-lg font-bold text-gold">100+</div>
                <div className="text-muted-foreground">XP Base</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gold">50+</div>
                <div className="text-muted-foreground">Coins</div>
              </div>
              <div>
                <div className="text-lg font-bold text-success">1</div>
                <div className="text-muted-foreground">Badge</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full btn-premium text-lg flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            Iniciar Desafio
          </button>
        </div>
      </StepWrapper>
    );
  }

  if (phase === 'challenge') {
    const breathScale = breathPhase === 'inhale' ? 'scale-150' : breathPhase === 'hold' ? 'scale-125' : 'scale-100';
    const breathColor = breathPhase === 'inhale' ? 'from-primary to-success' : breathPhase === 'hold' ? 'from-gold to-warning' : 'from-blue-500 to-purple-500';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex flex-col">
        <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
          
          {/* Timer and Stats */}
          <div className="text-center mb-8">
            <div className="premium-card p-4 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-primary" />
                  <span className="text-primary font-bold">{timeElapsed}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold" />
                  <span className="text-gold font-bold">{points} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Breathing Animation */}
          <div className="flex-1 flex items-center justify-center mb-8">
            <div className="relative">
              <div className={`
                w-40 h-40 rounded-full bg-gradient-to-br ${breathColor} 
                transition-all duration-1000 ease-in-out ${breathScale}
                shadow-lg animate-glow-pulse
              `}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wind className="w-16 h-16 text-white" />
                </div>
              </div>
              
              {/* Breath Instructions */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-2xl font-bold text-foreground capitalize">
                  {breathPhase === 'inhale' ? 'Inspire' : breathPhase === 'hold' ? 'Segure' : 'Expire'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {breathCount} respirações completas
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {showSkip && (
              <button
                onClick={handleSkip}
                className="w-full premium-button bg-gradient-to-r from-warning/80 to-warning text-lg flex items-center justify-center gap-3"
              >
                <SkipForward className="w-6 h-6" />
                Pular Desafio
                {timeElapsed < MINIMUM_TIME && (
                  <span className="text-xs opacity-75">(Sem pontos)</span>
                )}
              </button>
            )}
            
            {timeElapsed >= MINIMUM_TIME && (
              <button
                onClick={handleComplete}
                className="w-full premium-button text-lg flex items-center justify-center gap-3"
              >
                <Trophy className="w-6 h-6" />
                Concluir e Coletar: {points} pts
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-success/10 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="premium-card p-8">
            <div className="w-20 h-20 mx-auto mb-6 premium-card bg-gradient-to-br from-success/20 to-primary/20 border-success/30 flex items-center justify-center animate-bounce-in">
              <Trophy className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Desafio Concluído!
            </h2>
            <div className="space-y-3 text-lg">
              <p className="text-muted-foreground">Tempo: {timeElapsed} segundos</p>
              <p className="text-muted-foreground">Respirações: {breathCount}</p>
              {points > 0 && (
                <div className="premium-card p-4 bg-gradient-to-r from-success/20 to-primary/20 border-success/30">
                  <p className="text-success font-bold">+{points} XP • +{Math.floor(points/2)} Coins</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Step6BreathingChallenge;