import { Crown, Coins, Flame, Trophy, Users, Star, Zap } from 'lucide-react';
import { UserProfile } from '@/types/funnel';

interface GameInterfaceProps {
  userProfile: UserProfile;
}

const leagueColors = {
  iniciante: 'from-gray-400 to-gray-600',
  bronze: 'from-amber-600 to-amber-700',
  prata: 'from-slate-300 to-slate-500',
  ouro: 'from-gold to-gold-light',
  platina: 'from-blue-400 to-blue-600',
  diamante: 'from-purple-400 to-purple-600',
  liberdade: 'from-primary to-success'
};

export const GameInterface = ({ userProfile }: GameInterfaceProps) => {
  const xpForNextLevel = (userProfile.level * 100) - userProfile.xp;
  const currentLevelProgress = ((userProfile.xp % 100) / 100) * 100;

  return (
    <div className="relative z-50 p-0">
      {/* Premium iOS Header - Following References */}
      <div className="relative">
        {/* Status Bar */}
        <div className="flex justify-between items-center text-xs text-foreground/70 px-6 py-2">
          <span className="font-medium">9:41</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-foreground rounded-sm"></div>
              <div className="w-1 h-3 bg-foreground rounded-sm"></div>
              <div className="w-1 h-3 bg-foreground rounded-sm"></div>
              <div className="w-1 h-2 bg-foreground/30 rounded-sm"></div>
            </div>
            <svg className="w-6 h-4" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
              <rect x="2" y="7" width="14" height="10" fill="currentColor" opacity="0.8"/>
              <rect x="19" y="9" width="2" height="6" rx="1" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Main Header Card - Like References */}
        <div className="mx-4 mb-4">
          <div 
            className="relative overflow-hidden rounded-3xl p-6 border border-white/10"
            style={{
              background: 'var(--gradient-glass)',
              backdropFilter: 'var(--backdrop-blur)',
              boxShadow: 'var(--shadow-premium)'
            }}
          >
            {/* Premium Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-gold/20 border border-gold/30">
              <Star className="w-3 h-3 text-gold" />
              <span className="text-xs font-bold text-gold">Premium</span>
            </div>

            {/* User Profile Section - Like Reference */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-bold text-background">{userProfile.level}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hello,</p>
                <h2 className="text-xl font-bold text-foreground">
                  {userProfile.nickname || 'Guerreiro'}!
                </h2>
              </div>
            </div>

            {/* Large Number Display - Exactly Like References */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black" style={{ 
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px hsl(48 100% 55% / 0.5)'
                }}>
                  {userProfile.respirCoins}
                </span>
                <span className="text-lg text-muted-foreground font-medium">bonuses</span>
              </div>
            </div>

            {/* Premium Stats Cards - Like References */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* Regular */}
              <div 
                className="relative p-4 rounded-2xl border border-white/10"
                style={{
                  background: 'var(--gradient-glass)',
                  backdropFilter: 'var(--backdrop-blur)',
                  boxShadow: 'var(--shadow-glass)'
                }}
              >
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Regular</p>
                  <p className="text-xl font-bold text-foreground">
                    ${(userProfile.monthlySpend * 0.3).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Premium */}
              <div 
                className="relative p-4 rounded-2xl border border-primary/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(120, 255, 120, 0.1) 0%, rgba(120, 255, 120, 0.05) 100%)',
                  backdropFilter: 'var(--backdrop-blur)',
                  boxShadow: 'var(--shadow-glow-primary)'
                }}
              >
                <div className="text-center">
                  <p className="text-xs text-primary mb-1">Premium</p>
                  <p className="text-xl font-bold text-primary">
                    ${(userProfile.monthlySpend * 0.4).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Diesel */}
              <div 
                className="relative p-4 rounded-2xl border border-gold/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
                  backdropFilter: 'var(--backdrop-blur)',
                  boxShadow: 'var(--shadow-glow-gold)'
                }}
              >
                <div className="text-center">
                  <p className="text-xs text-gold mb-1">Diesel</p>
                  <p className="text-xl font-bold text-gold">
                    ${(userProfile.monthlySpend * 0.2).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Stats Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">{userProfile.streak}d</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gold" />
                  <span className="text-sm font-bold text-gold">{userProfile.badges.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-success" />
                  <span className="text-sm font-bold text-success">{userProfile.joinedSquad ? 'ON' : 'OFF'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold" />
                <span className="text-sm font-bold text-gold">{userProfile.xp} XP</span>
              </div>
            </div>

            {/* Progress Bar - Bottom */}
            <div className="mt-4">
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                <span>Level Progress</span>
                <span>{xpForNextLevel} XP to next level</span>
              </div>
              <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${currentLevelProgress}%`,
                    background: 'var(--gradient-primary)',
                    boxShadow: 'var(--shadow-glow-primary)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};