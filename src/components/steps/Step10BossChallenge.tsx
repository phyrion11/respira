import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Skull, Zap, Shield, Sword, Timer, Trophy, Star, AlertTriangle } from 'lucide-react';
import { StepWrapper } from '../StepWrapper';

interface Step10BossChallengeProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack?: () => void;
}

const Step10BossChallenge = ({ userProfile, onUpdateProfile, onNext, onBack }: Step10BossChallengeProps) => {
  const [phase, setPhase] = useState<'intro' | 'instructions' | 'challenge' | 'quicktime' | 'victory'>('intro');
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [bossHealth, setBossHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [points, setPoints] = useState(0);
  const [quickTimeEvents, setQuickTimeEvents] = useState(0);
  const [showQuickTime, setShowQuickTime] = useState(false);
  const [quickTimeButton, setQuickTimeButton] = useState<'attack' | 'defend' | 'special'>('attack');
  const [bonusMultiplier, setBonusMultiplier] = useState(1);

  const MINIMUM_TIME = 10;
  const BOSS_NAME = "Sr. Ansiedade";
  const MAX_QUICKTIME_EVENTS = 3;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && phase === 'challenge') {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          
          // Damage boss over time (player is "resisting")
          if (newTime % 2 === 0) {
            setBossHealth(prev => Math.max(0, prev - 5));
          }
          
          // Boss attacks player occasionally
          if (newTime % 7 === 0 && newTime > 5) {
            setPlayerHealth(prev => Math.max(0, prev - 15));
          }
          
          // Calculate base points
          if (newTime >= MINIMUM_TIME) {
            const basePoints = 200;
            const timeBonus = Math.floor((newTime - MINIMUM_TIME) / 3) * 25;
            setPoints(basePoints + timeBonus);
          }
          
          // Trigger quick time events after minimum time
          if (newTime >= MINIMUM_TIME && newTime % 15 === 0 && quickTimeEvents < MAX_QUICKTIME_EVENTS) {
            triggerQuickTimeEvent();
          }
          
          // Boss defeated
          if (bossHealth <= 0) {
            setPhase('victory');
            setIsActive(false);
          }
          
          // Player defeated
          if (playerHealth <= 0) {
            handleDefeat();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, phase, bossHealth, playerHealth, quickTimeEvents]);

  const triggerQuickTimeEvent = () => {
    setShowQuickTime(true);
    const events = ['attack', 'defend', 'special'] as const;
    setQuickTimeButton(events[Math.floor(Math.random() * events.length)]);
    
    // Auto-hide after 3 seconds if not clicked
    setTimeout(() => {
      if (showQuickTime) {
        setShowQuickTime(false);
        // Missed quick time event - boss gets stronger
        setPlayerHealth(prev => Math.max(0, prev - 20));
      }
    }, 3000);
  };

  const handleQuickTimeEvent = () => {
    setShowQuickTime(false);
    setQuickTimeEvents(prev => prev + 1);
    
    // Successful quick time event
    setBossHealth(prev => Math.max(0, prev - 25));
    setBonusMultiplier(prev => prev + 0.5);
    setPoints(prev => prev + 100);
    
    // Visual feedback
    setTimeout(() => {
      // Particle effect would go here
    }, 100);
  };

  const handleDefeat = () => {
    setIsActive(false);
    // Player can retry or skip with no points
    setTimeout(() => {
      onUpdateProfile({
        xp: userProfile.xp + 50, // Consolation XP
        respirCoins: userProfile.respirCoins + 25
      });
      onNext();
    }, 2000);
  };

  const handleVictory = () => {
    const finalPoints = Math.floor(points * bonusMultiplier);
    const coinsEarned = Math.floor(finalPoints / 2);
    
    setTimeout(() => {
      onUpdateProfile({
        xp: userProfile.xp + finalPoints,
        respirCoins: userProfile.respirCoins + coinsEarned,
        badges: [...userProfile.badges, 'Vencedor de Boss', 'Destruidor da Ansiedade']
      });
      onNext();
    }, 3000);
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-red-900/20 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="premium-card p-8 border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-900/10">
            <div className="w-24 h-24 mx-auto mb-6 premium-card bg-gradient-to-br from-red-500/20 to-red-900/20 border-red-500/40 flex items-center justify-center animate-boss-appear">
              <Skull className="w-12 h-12 text-red-400" />
            </div>
            <h1 className="text-4xl font-black text-red-400 mb-4 animate-glow-pulse">
              BOSS FIGHT!
            </h1>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {BOSS_NAME} Apareceu!
            </h2>
            <p className="text-muted-foreground mb-6">
              O chefe final dos seus gatilhos está aqui. Derrote-o para conquistar sua liberdade definitiva!
            </p>
            <button
              onClick={() => setPhase('instructions')}
              className="premium-button bg-gradient-to-r from-red-500 to-red-600 text-lg"
            >
              Aceitar Desafio
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-red-900/20 flex flex-col">
        <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 premium-card bg-gradient-to-br from-red-500/20 to-red-900/20 border-red-500/40 flex items-center justify-center">
              <Sword className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-4">
              Como Derrotar o Boss
            </h1>
            <p className="text-muted-foreground mb-2">
              Nível 5 • Dificuldade: EXTREMA
            </p>
          </div>

          <div className="premium-card p-6 mb-6 border-red-500/30">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Mecânicas de Combate:
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>Resista aos ataques do boss mantendo o foco</p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p>Eventos de tempo rápido aparecem - clique rápido!</p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p>Cada evento bem-sucedido aumenta seu multiplicador</p>
              </div>
            </div>
          </div>

          <div className="premium-card p-4 mb-6 bg-gradient-to-r from-gold/10 to-success/10 border-gold/20">
            <h3 className="font-bold text-gold mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recompensas Épicas
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <div className="text-lg font-bold text-gold">500+</div>
                <div className="text-muted-foreground">XP Base</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gold">250+</div>
                <div className="text-muted-foreground">Coins</div>
              </div>
              <div>
                <div className="text-lg font-bold text-success">2</div>
                <div className="text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setPhase('challenge');
              setIsActive(true);
            }}
            className="w-full premium-button bg-gradient-to-r from-red-500 to-red-600 text-lg flex items-center justify-center gap-3"
          >
            <Sword className="w-6 h-6" />
            Enfrentar {BOSS_NAME}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'challenge') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-red-900/20 flex flex-col">
        <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
          
          {/* Battle HUD */}
          <div className="premium-card p-4 mb-6 border-red-500/30">
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">VOCÊ</p>
                <div className="w-24 h-2 bg-red-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
                    style={{ width: `${playerHealth}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-success">{playerHealth} HP</p>
              </div>
              
              <div className="text-center">
                <Timer className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-primary">{timeElapsed}s</p>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">{BOSS_NAME}</p>
                <div className="w-24 h-2 bg-red-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                    style={{ width: `${bossHealth}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-red-400">{bossHealth} HP</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pontos: <span className="text-gold font-bold">{points}</span></p>
              <p className="text-xs text-muted-foreground">Multiplicador: {bonusMultiplier.toFixed(1)}x</p>
            </div>
          </div>

          {/* Boss Visual */}
          <div className="flex-1 flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 premium-card bg-gradient-to-br from-red-500/20 to-red-900/20 border-red-500/40 flex items-center justify-center animate-glow-pulse">
                <Skull className="w-16 h-16 text-red-400" />
              </div>
              
              {/* Damage indicators */}
              {bossHealth < 75 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
              )}
              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-lg font-bold text-red-400">{BOSS_NAME}</p>
                <p className="text-xs text-muted-foreground">
                  {bossHealth > 75 ? "Está forte..." : 
                   bossHealth > 25 ? "Está enfraquecendo!" : "Quase derrotado!"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Time Event */}
          {showQuickTime && (
            <div className="premium-card p-6 mb-4 bg-gradient-to-r from-gold/20 to-success/20 border-gold/40 animate-bounce-in">
              <div className="text-center">
                <p className="text-lg font-bold text-gold mb-3">EVENTO RÁPIDO!</p>
                <button
                  onClick={handleQuickTimeEvent}
                  className="premium-button bg-gradient-to-r from-gold to-success text-lg animate-glow-pulse"
                >
                  {quickTimeButton === 'attack' && <><Sword className="w-6 h-6 inline mr-2" />ATACAR!</>}
                  {quickTimeButton === 'defend' && <><Shield className="w-6 h-6 inline mr-2" />DEFENDER!</>}
                  {quickTimeButton === 'special' && <><Zap className="w-6 h-6 inline mr-2" />ESPECIAL!</>}
                </button>
                <p className="text-xs text-muted-foreground mt-2">Clique rápido! +100 pts</p>
              </div>
            </div>
          )}

          {/* Battle Status */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {timeElapsed < MINIMUM_TIME 
                ? `Resista por mais ${MINIMUM_TIME - timeElapsed} segundos...`
                : "Continue resistindo para mais pontos!"
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'victory') {
    const finalPoints = Math.floor(points * bonusMultiplier);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-success/20 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="premium-card p-8">
            <div className="w-24 h-24 mx-auto mb-6 premium-card bg-gradient-to-br from-gold/20 to-success/20 border-gold/40 flex items-center justify-center animate-bounce-in">
              <Trophy className="w-12 h-12 text-gold" />
            </div>
            <h1 className="text-4xl font-black text-gradient mb-4 animate-celebrate">
              VITÓRIA ÉPICA!
            </h1>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {BOSS_NAME} foi derrotado!
            </h2>
            
            <div className="space-y-4">
              <div className="premium-card p-4 bg-gradient-to-r from-gold/20 to-success/20 border-gold/30">
                <p className="text-lg font-bold text-gold">+{finalPoints} XP</p>
                <p className="text-sm text-muted-foreground">Multiplicador: {bonusMultiplier.toFixed(1)}x</p>
              </div>
              
              <div className="premium-card p-4 bg-gradient-to-r from-success/20 to-primary/20 border-success/30">
                <p className="text-lg font-bold text-success">+{Math.floor(finalPoints/2)} Coins</p>
              </div>
              
              <div className="premium-card p-4 bg-gradient-to-r from-primary/20 to-dream/20 border-primary/30">
                <p className="text-sm font-bold text-primary">Badges Desbloqueados:</p>
                <p className="text-xs text-muted-foreground">Vencedor de Boss • Destruidor da Ansiedade</p>
              </div>
            </div>
            
            <button
              onClick={handleVictory}
              className="w-full mt-6 premium-button text-lg"
            >
              Continuar Jornada
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Step10BossChallenge;