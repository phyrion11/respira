import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Brain, Trophy, Zap, X } from 'lucide-react';

interface Challenge3MemoryProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onSkip: () => void;
}

const SEQUENCE_LENGTH = 5;
const COLORS = [
  { id: 'green', class: 'bg-gradient-to-br from-primary to-primary-glow', name: 'Verde' },
  { id: 'yellow', class: 'bg-gradient-to-br from-warning to-gold', name: 'Amarelo' },
  { id: 'blue', class: 'bg-gradient-to-br from-blue-500 to-cyan-500', name: 'Azul' },
  { id: 'purple', class: 'bg-gradient-to-br from-purple-500 to-pink-500', name: 'Roxo' }
];

export const Challenge3Memory = ({ userProfile, onUpdateProfile, onNext, onSkip }: Challenge3MemoryProps) => {
  const [phase, setPhase] = useState<'instructions' | 'showing' | 'input' | 'complete' | 'failed'>('instructions');
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (phase === 'showing') {
      if (currentShowIndex < sequence.length) {
        const timer = setTimeout(() => {
          setCurrentShowIndex(prev => prev + 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        // Finished showing sequence
        setTimeout(() => {
          setPhase('input');
        }, 500);
      }
    }
  }, [phase, currentShowIndex, sequence.length]);

  useEffect(() => {
    if (phase !== 'input') return;

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

  const startChallenge = () => {
    // Generate random sequence
    const newSequence: string[] = [];
    for (let i = 0; i < SEQUENCE_LENGTH; i++) {
      newSequence.push(COLORS[Math.floor(Math.random() * COLORS.length)].id);
    }
    setSequence(newSequence);
    setCurrentShowIndex(0);
    setUserInput([]);
    setPhase('showing');
  };

  const handleColorClick = (colorId: string) => {
    if (phase !== 'input') return;

    const newInput = [...userInput, colorId];
    setUserInput(newInput);

    // Check if correct
    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      setPhase('failed');
      return;
    }

    // Check if complete
    if (newInput.length === sequence.length) {
      setPhase('complete');
    }
  };

  const handleCollectPoints = () => {
    onUpdateProfile({
      xp: userProfile.xp + 200,
      respirCoins: userProfile.respirCoins + 100,
      badges: [...userProfile.badges, 'Memória de Elefante'],
      completedChallenges: [...userProfile.completedChallenges, 'memory-challenge-3']
    });
    onNext();
  };

  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-fade-up">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-4 mx-auto animate-glow-pulse">
                <Brain className="w-12 h-12 text-background" />
              </div>
              <div className="absolute -top-2 -right-2 bg-warning text-background px-3 py-1 rounded-full text-xs font-bold">
                Nível 3
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground">
              Desafio: Memória Livre
            </h2>
            <p className="text-muted-foreground text-lg">
              Treine sua mente, fortaleça sua vontade
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              Como Funciona
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-500 font-bold text-sm">1</span>
                </div>
                <p className="text-foreground/80">Memorize a sequência de 5 cores</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-500 font-bold text-sm">2</span>
                </div>
                <p className="text-foreground/80">Repita a sequência corretamente</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-500 font-bold text-sm">3</span>
                </div>
                <p className="text-foreground/80">Você tem 15 segundos para completar</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Recompensa:</span>
                <div className="flex items-center gap-3">
                  <span className="text-purple-500 font-bold">+200 XP</span>
                  <span className="text-gold font-bold">+100 Coins</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={startChallenge}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
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
            Não foi dessa vez!
          </h2>
          
          <p className="text-muted-foreground">
            Mas não desista! Cada tentativa fortalece sua mente.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={startChallenge}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-bounce-in text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-success-burst">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Memória Perfeita!
          </h2>
          
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-500/10 rounded-2xl">
                <div className="text-3xl font-bold text-purple-500">+200</div>
                <div className="text-sm text-muted-foreground">XP Ganho</div>
              </div>
              <div className="text-center p-4 bg-gold/10 rounded-2xl">
                <div className="text-3xl font-bold text-gold">+100</div>
                <div className="text-sm text-muted-foreground">RespiCoins</div>
              </div>
            </div>
            
            <div className="p-4 bg-success/10 rounded-2xl border border-success/20">
              <p className="text-success font-bold">🏆 Badge Desbloqueado: Memória de Elefante</p>
            </div>
          </div>

          <button
            onClick={handleCollectPoints}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            Coletar Recompensas
          </button>
        </div>
      </div>
    );
  }

  // Showing or Input Phase
  const getCountdownColor = () => {
    if (countdown > 10) return 'text-success';
    if (countdown > 5) return 'text-warning';
    return 'text-destructive animate-pulse';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Status */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        {phase === 'showing' ? (
          <div className="text-2xl font-bold text-foreground mb-2">
            MEMORIZE
          </div>
        ) : (
          <>
            <div className={`text-6xl font-bold ${getCountdownColor()} transition-colors duration-300`}>
              {countdown}s
            </div>
            <div className="text-muted-foreground">
              {userInput.length}/{sequence.length}
            </div>
          </>
        )}
      </div>

      {/* Color Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          {COLORS.map((color, index) => {
            const isShowing = phase === 'showing' && currentShowIndex - 1 === sequence.findIndex((s, i) => i === currentShowIndex - 1 && s === color.id);
            const isSelected = userInput.includes(color.id);
            
            return (
              <button
                key={color.id}
                onClick={() => handleColorClick(color.id)}
                disabled={phase !== 'input'}
                className={`
                  w-32 h-32 rounded-3xl ${color.class} 
                  flex items-center justify-center
                  transition-all duration-300
                  ${phase === 'input' ? 'hover:scale-110 cursor-pointer' : 'cursor-not-allowed'}
                  ${isShowing ? 'scale-125 ring-4 ring-white shadow-2xl' : 'scale-100'}
                  ${isSelected && phase === 'input' ? 'opacity-50' : 'opacity-100'}
                `}
              >
                <span className="text-background font-bold text-lg">
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skip Button */}
      {phase === 'input' && (
        <div className="w-full max-w-md pb-8">
          <button
            onClick={onSkip}
            className="w-full glass-effect px-6 py-3 rounded-2xl font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Pular Desafio (Sem Recompensas)
          </button>
        </div>
      )}
    </div>
  );
};