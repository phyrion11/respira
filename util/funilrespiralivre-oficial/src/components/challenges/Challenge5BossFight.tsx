import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Flame, Trophy, Zap, X, Shield, Heart, Swords } from 'lucide-react';

interface Challenge5BossFightProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const Challenge5BossFight = ({ userProfile, onUpdateProfile, onNext, onSkip }: Challenge5BossFightProps) => {
  const [phase, setPhase] = useState<'instructions' | 'battle' | 'qte' | 'complete'>('instructions');
  const [bossHealth, setBossHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [totalTime, setTotalTime] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [bonusesCollected, setBonusesCollected] = useState(0);
  const [currentQTE, setCurrentQTE] = useState<'shield' | 'heart' | 'swords' | null>(null);
  const [qteTimer, setQteTimer] = useState(3);
  const [autoAttackInterval, setAutoAttackInterval] = useState<NodeJS.Timeout | null>(null);

  const maxTime = 60;
  const minTimeForRewards = 10;

  useEffect(() => {
    if (phase !== 'battle') return;

    const interval = setInterval(() => {
      setTotalTime(prev => {
        if (prev >= maxTime) {
          handleVictory();
          return prev;
        }
        
        if (prev >= minTimeForRewards && !showSkip) {
          setShowSkip(true);
        }
        
        return prev + 1;
      });

      // Auto damage to boss
      setBossHealth(prev => {
        const newHealth = Math.max(0, prev - 2);
        if (newHealth === 0) {
          handleVictory();
        }
        return newHealth;
      });

      // Random QTE triggers (every 10-15 seconds)
      if (totalTime > 0 && totalTime % 10 === 0 && !currentQTE && totalTime >= minTimeForRewards && bonusesCollected < 3) {
        triggerQTE();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, totalTime, currentQTE, showSkip, bonusesCollected]);

  useEffect(() => {
    if (phase === 'qte' && currentQTE) {
      setQteTimer(3);
      const interval = setInterval(() => {
        setQteTimer(prev => {
          if (prev <= 1) {
            // QTE failed
            setPlayerHealth(health => Math.max(0, health - 20));
            setCurrentQTE(null);
            setPhase('battle');
            return 3;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [phase, currentQTE]);

  const triggerQTE = () => {
    const qtes: ('shield' | 'heart' | 'swords')[] = ['shield', 'heart', 'swords'];
    const randomQTE = qtes[Math.floor(Math.random() * qtes.length)];
    setCurrentQTE(randomQTE);
    setPhase('qte');
  };

  const handleQTESuccess = () => {
    if (!currentQTE) return;

    setBonusesCollected(prev => prev + 1);
    
    // Different bonuses for each QTE
    switch (currentQTE) {
      case 'shield':
        setPlayerHealth(health => Math.min(100, health + 20));
        break;
      case 'heart':
        setBossHealth(health => Math.max(0, health - 15));
        break;
      case 'swords':
        setBossHealth(health => Math.max(0, health - 25));
        break;
    }

    setCurrentQTE(null);
    setPhase('battle');
  };

  const handleVictory = () => {
    if (autoAttackInterval) {
      clearInterval(autoAttackInterval);
    }
    setPhase('complete');
  };

  const handleCollectRewards = () => {
    const baseXP = 400;
    const timeBonus = Math.min(totalTime * 5, 300);
    const qteBonus = bonusesCollected * 100;
    const totalXP = baseXP + timeBonus + qteBonus;
    
    const baseCoins = 200;
    const coinBonus = bonusesCollected * 50;
    const totalCoins = baseCoins + coinBonus;

    const newBadges = [
      ...userProfile.badges,
      'Matador de Chefe',
      'Guerreiro da Liberdade'
    ];

    if (bonusesCollected >= 3) {
      newBadges.push('Colecionador Perfeito');
    }

    onUpdateProfile({
      xp: userProfile.xp + totalXP,
      respirCoins: userProfile.respirCoins + totalCoins,
      badges: newBadges,
      completedChallenges: [...userProfile.completedChallenges, 'boss-fight-5']
    });
    onNext();
  };

  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-fade-up">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-destructive to-smoking rounded-3xl flex items-center justify-center mb-4 mx-auto animate-glow-pulse">
                <Flame className="w-16 h-16 text-background" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gold text-background px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                BOSS
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground">
              BATALHA FINAL
            </h2>
            <p className="text-lg font-bold text-destructive">
              O Demônio do Cigarro
            </p>
            <p className="text-muted-foreground">
              Derrote o chefe final e prove sua força
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-destructive" />
              Como Funciona
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive font-bold text-sm">1</span>
                </div>
                <p className="text-foreground/80">Seu personagem ataca automaticamente o chefe</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive font-bold text-sm">2</span>
                </div>
                <p className="text-foreground/80">Quanto mais tempo lutar, mais pontos ganha</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive font-bold text-sm">3</span>
                </div>
                <p className="text-foreground/80">
                  <span className="font-bold text-warning">EVENTOS RÁPIDOS:</span> Botões especiais aparecem - clique rápido para bônus!
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive font-bold text-sm">4</span>
                </div>
                <p className="text-foreground/80">Máximo de 3 eventos bônus disponíveis</p>
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <div className="p-3 bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl border border-success/20 flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm text-foreground/80">Escudo: +20% vida</span>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-destructive/10 to-smoking/10 rounded-2xl border border-destructive/20 flex items-center gap-2">
                <Swords className="w-5 h-5 text-destructive" />
                <span className="text-sm text-foreground/80">Ataque Crítico: -25% vida do chefe</span>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-warning/10 to-gold/10 rounded-2xl border border-warning/20 flex items-center gap-2">
                <Heart className="w-5 h-5 text-warning" />
                <span className="text-sm text-foreground/80">Cura: +20% vida</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-destructive/10 to-gold/10 rounded-2xl border border-destructive/20">
              <div className="text-center">
                <div className="text-sm text-foreground/80 mb-2">Recompensa Máxima:</div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-2xl font-bold text-destructive">+700 XP</span>
                  <span className="text-2xl font-bold text-gold">+350 Coins</span>
                </div>
                <div className="text-xs text-warning mt-2">
                  +100 XP por evento bônus coletado!
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase('battle')}
            className="w-full bg-gradient-to-r from-destructive via-smoking to-destructive text-white px-6 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-destructive/50 flex items-center justify-center gap-2 animate-pulse"
          >
            <Flame className="w-6 h-6" />
            INICIAR BATALHA
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'qte') {
    const qteIcons = {
      shield: { icon: Shield, color: 'from-success to-primary', text: 'DEFENDER!' },
      heart: { icon: Heart, color: 'from-warning to-gold', text: 'CURAR!' },
      swords: { icon: Swords, color: 'from-destructive to-smoking', text: 'ATACAR!' }
    };

    const current = currentQTE ? qteIcons[currentQTE] : null;
    if (!current) return null;

    const Icon = current.icon;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Pulsing background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-20 animate-pulse`} />
        
        <div className="relative z-10 text-center space-y-8">
          <div className="text-6xl font-bold text-warning animate-bounce">
            {qteTimer}
          </div>
          
          <button
            onClick={handleQTESuccess}
            className={`group relative`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${current.color} rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity animate-pulse`} />
            <div className={`relative w-64 h-64 bg-gradient-to-br ${current.color} rounded-full flex flex-col items-center justify-center hover:scale-110 transition-transform duration-200 shadow-2xl`}>
              <Icon className="w-32 h-32 text-white mb-4" />
              <div className="text-3xl font-bold text-white">{current.text}</div>
            </div>
          </button>

          <div className="text-2xl font-bold text-foreground">
            CLIQUE RÁPIDO!
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    const baseXP = 400;
    const timeBonus = Math.min(totalTime * 5, 300);
    const qteBonus = bonusesCollected * 100;
    const totalXP = baseXP + timeBonus + qteBonus;
    
    const baseCoins = 200;
    const coinBonus = bonusesCollected * 50;
    const totalCoins = baseCoins + coinBonus;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 animate-bounce-in text-center">
          <div className="w-40 h-40 bg-gradient-to-br from-gold to-warning rounded-full flex items-center justify-center mb-4 mx-auto animate-success-burst shadow-2xl">
            <Trophy className="w-24 h-24 text-background" />
          </div>
          
          <h2 className="text-5xl font-bold text-gradient-gold mb-2">
            VITÓRIA ÉPICA!
          </h2>
          
          <p className="text-xl text-foreground/80">
            Você derrotou o Demônio do Cigarro!
          </p>
          
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            {/* Battle Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <div className="text-3xl font-bold text-primary">{totalTime}s</div>
                <div className="text-xs text-muted-foreground">Tempo de Batalha</div>
              </div>
              <div className="p-4 bg-gold/10 rounded-2xl">
                <div className="text-3xl font-bold text-gold">{bonusesCollected}/3</div>
                <div className="text-xs text-muted-foreground">Bônus Coletados</div>
              </div>
            </div>

            {/* Rewards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-destructive/10 rounded-2xl">
                <div className="text-4xl font-bold text-destructive">+{totalXP}</div>
                <div className="text-sm text-muted-foreground">XP Total</div>
                <div className="text-xs text-warning mt-1">
                  Base: {baseXP} • Tempo: +{timeBonus} • QTE: +{qteBonus}
                </div>
              </div>
              <div className="text-center p-4 bg-gold/10 rounded-2xl">
                <div className="text-4xl font-bold text-gold">+{totalCoins}</div>
                <div className="text-sm text-muted-foreground">RespiCoins</div>
              </div>
            </div>
            
            {/* Badges */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="p-3 bg-success/10 rounded-2xl border border-success/20">
                <p className="text-success font-bold text-sm">🏆 Matador de Chefe</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                <p className="text-primary font-bold text-sm">⚔️ Guerreiro da Liberdade</p>
              </div>
              {bonusesCollected >= 3 && (
                <div className="p-3 bg-gold/10 rounded-2xl border border-gold/20">
                  <p className="text-gold font-bold text-sm">💎 Colecionador Perfeito</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleCollectRewards}
            className="w-full bg-gradient-to-r from-gold via-warning to-gold text-background px-6 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/50 animate-pulse"
          >
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6" />
              COLETAR TODAS AS RECOMPENSAS
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Battle Phase
  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      {/* Health Bars */}
      <div className="space-y-3 mb-8 pt-8">
        {/* Player Health */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-primary">SEU PODER</span>
            <span className="text-sm font-bold text-primary">{playerHealth}%</span>
          </div>
          <div className="w-full h-6 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500 rounded-full"
              style={{ width: `${playerHealth}%` }}
            />
          </div>
        </div>

        {/* Boss Health */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-destructive">DEMÔNIO DO CIGARRO</span>
            <span className="text-sm font-bold text-destructive">{bossHealth}%</span>
          </div>
          <div className="w-full h-6 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-destructive to-smoking transition-all duration-500 rounded-full"
              style={{ width: `${bossHealth}%` }}
            />
          </div>
        </div>
      </div>

      {/* Battle Animation Area */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Time and Points */}
        <div className="text-center space-y-2">
          <div className="text-6xl font-bold text-gradient-gold">
            {totalTime}s
          </div>
          <div className="text-muted-foreground text-lg">
            +{Math.min(totalTime * 5, 300)} XP • {bonusesCollected}/3 Bônus
          </div>
        </div>

        {/* Boss Visual */}
        <div className="relative">
          <div className="w-48 h-48 bg-gradient-to-br from-destructive to-smoking rounded-full flex items-center justify-center animate-pulse shadow-2xl">
            <Flame className="w-24 h-24 text-background animate-spin-slow" />
          </div>
          {/* Damage indicators */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-4xl font-bold text-destructive animate-ping opacity-0">
              -2
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full max-w-md mx-auto space-y-3 pb-8">
        {showSkip && (
          <>
            <button
              onClick={handleCollectRewards}
              className="w-full bg-gradient-to-r from-gold to-warning text-background px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/30"
            >
              Concluir Batalha: +{400 + Math.min(totalTime * 5, 300) + (bonusesCollected * 100)} XP
            </button>
            
            <button
              onClick={onSkip}
              className="w-full glass-effect px-6 py-3 rounded-2xl font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Fugir da Batalha (Sem Recompensas)
            </button>
          </>
        )}
      </div>
    </div>
  );
};