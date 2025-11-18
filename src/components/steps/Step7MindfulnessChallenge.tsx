import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Brain, Play, SkipForward, Trophy, Timer, Zap, Target } from 'lucide-react';
import { StepWrapper } from '../StepWrapper';

interface Step7MindfulnessChallengeProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack?: () => void;
}

const Step7MindfulnessChallenge = ({ userProfile, onUpdateProfile, onNext, onBack }: Step7MindfulnessChallengeProps) => {
  const [phase, setPhase] = useState<'instructions' | 'challenge' | 'completed'>('instructions');
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [focusLevel, setFocusLevel] = useState(100);
  const [points, setPoints] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [mindfulnessPhase, setMindfulnessPhase] = useState<'observe' | 'accept' | 'release'>('observe');

  const MINIMUM_TIME = 10;
  const CHALLENGE_DURATION = 60;

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
          
          // Calculate points
          if (newTime >= MINIMUM_TIME) {
            const basePoints = 150;
            const timeBonus = Math.floor((newTime - MINIMUM_TIME) / 5) * 15;
            const focusBonus = Math.floor(focusLevel / 10) * 5;
            setPoints(basePoints + timeBonus + focusBonus);
          }
          
          // Cycle through mindfulness phases
          const phaseTime = newTime % 15;
          if (phaseTime < 5) {
            setMindfulnessPhase('observe');
          } else if (phaseTime < 10) {
            setMindfulnessPhase('accept');
          } else {
            setMindfulnessPhase('release');
          }
          
          // Simulate focus fluctuation
          setFocusLevel(prev => {
            const fluctuation = Math.random() * 10 - 5;
            return Math.max(0, Math.min(100, prev + fluctuation));
          });
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, phase, focusLevel]);

  const handleStart = () => {
    setPhase('challenge');
    setIsActive(true);
    setTimeElapsed(0);
    setPoints(0);
    setShowSkip(false);
    setFocusLevel(100);
  };

  const handleSkip = () => {
    if (timeElapsed < MINIMUM_TIME) {
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
        respirCoins: userProfile.respirCoins + Math.floor(earnedPoints / 3),
        badges: earnedPoints > 0 ? [...userProfile.badges, 'Mente Mindful'] : userProfile.badges
      });
      onNext();
    }, 2000);
  };

  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-purple-900/20 flex flex-col">
        <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 premium-card bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30 flex items-center justify-center animate-float">
              <Brain className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-4">
              Desafio Mindfulness
            </h1>
            <p className="text-muted-foreground mb-2">
              Nível 2 • Dificuldade: Moderado
            </p>
          </div>

          <div className="premium-card p-6 mb-6 border-purple-500/30">
            <h2 className="text-xl font-bold text-foreground mb-4">Técnica dos 3 Passos:</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 premium-card bg-gradient-to-br from-blue-500/20 to-blue-500/10 border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-blue-400">1</span>
                </div>
                <div>
                  <p className="font-bold text-blue-400">Observar</p>
                  <p>Note seus pensamentos e sensações sem julgamento</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 premium-card bg-gradient-to-br from-purple-500/20 to-purple-500/10 border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-purple-400">2</span>
                </div>
                <div>
                  <p className="font-bold text-purple-400">Aceitar</p>
                  <p>Aceite o que está sentindo no momento presente</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 premium-card bg-gradient-to-br from-green-500/20 to-green-500/10 border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-green-400">3</span>
                </div>
                <div>
                  <p className="font-bold text-green-400">Liberar</p>
                  <p>Deixe os pensamentos passarem como nuvens no céu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card p-4 mb-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <h3 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recompensas Zen
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <div className="text-lg font-bold text-gold">150+</div>
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
            className="w-full premium-button bg-gradient-to-r from-purple-500 to-blue-500 text-lg flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            Iniciar Meditação
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'challenge') {
    const phaseColors = {
      observe: 'from-blue-500 to-blue-600',
      accept: 'from-purple-500 to-purple-600',
      release: 'from-green-500 to-green-600'
    };
    
    const phaseTexts = {
      observe: 'Observe seus pensamentos...',
      accept: 'Aceite o momento presente...',
      release: 'Libere e deixe fluir...'
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-purple-900/20 flex flex-col">
        <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
          
          {/* Stats */}
          <div className="premium-card p-4 mb-6 border-purple-500/30">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-bold">{timeElapsed}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-bold">{Math.floor(focusLevel)}% foco</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold" />
                <span className="text-gold font-bold">{points} pts</span>
              </div>
            </div>
          </div>

          {/* Mindfulness Visual */}
          <div className="flex-1 flex items-center justify-center mb-8">
            <div className="relative">
              <div className={`
                w-48 h-48 rounded-full bg-gradient-to-br ${phaseColors[mindfulnessPhase]}
                transition-all duration-3000 ease-in-out animate-glow-pulse
                flex items-center justify-center
              `}>
                <Brain className="w-20 h-20 text-white" />
              </div>
              
              {/* Focus Level Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                    strokeDasharray={`${focusLevel * 2.83} 283`}
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
              
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-xl font-bold text-foreground capitalize">
                  {phaseTexts[mindfulnessPhase]}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Ciclo {Math.floor(timeElapsed / 15) + 1}
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
                className="w-full premium-button bg-gradient-to-r from-purple-500 to-blue-500 text-lg flex items-center justify-center gap-3"
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
      <div className="min-h-screen bg-gradient-to-br from-background to-purple-900/20 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="premium-card p-8 border-purple-500/30">
            <div className="w-20 h-20 mx-auto mb-6 premium-card bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30 flex items-center justify-center animate-bounce-in">
              <Brain className="w-10 h-10 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Mente Tranquila!
            </h2>
            <div className="space-y-3 text-lg">
              <p className="text-muted-foreground">Tempo de meditação: {timeElapsed}s</p>
              <p className="text-muted-foreground">Foco médio: {Math.floor(focusLevel)}%</p>
              {points > 0 && (
                <div className="premium-card p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30">
                  <p className="text-purple-400 font-bold">+{points} XP • +{Math.floor(points/3)} Coins</p>
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

export default Step7MindfulnessChallenge;