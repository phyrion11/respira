import { Trophy, Star, Zap, Crown, Flame } from 'lucide-react';
import { UserProfile } from '@/types/funnel';

interface GameHeaderProps {
  userProfile: UserProfile;
  currentStep: number;
  totalSteps: number;
}

export const GameHeader = ({ userProfile, currentStep, totalSteps }: GameHeaderProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  const level = Math.floor(userProfile.xp / 100) + 1;
  const xpForNextLevel = ((level) * 100) - userProfile.xp;
  const currentLevelProgress = ((userProfile.xp % 100) / 100) * 100;

  return (
    <div className="sticky top-0 z-50 glass-panel particle-container">
      <div className="max-w-md mx-auto px-6 py-6">
        {/* Level & Progress Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="level-indicator">
                <Crown className="w-5 h-5 text-gold" />
              </div>
              <span className="text-sm font-bold text-foreground">
                Nível {level}
              </span>
            </div>
            <span className="text-sm font-medium text-primary">
              Etapa {currentStep}/{totalSteps}
            </span>
          </div>
          
          {/* Dual Progress Bars */}
          <div className="space-y-3">
            {/* XP Progress */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>XP até próximo nível</span>
                <span>{100 - (userProfile.xp % 100)} XP restantes</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="progress-bar-premium h-full transition-all duration-1000 ease-out"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
            </div>
            
            {/* Step Progress */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progresso da jornada</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-dream to-gold h-full transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Game Stats */}
        <div className="grid grid-cols-3 gap-4">
          {/* XP Display */}
          <div className="glass-panel p-3 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-primary to-dream rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs text-muted-foreground mb-1">XP Total</div>
            <div className="text-lg font-bold text-primary">{userProfile.xp}</div>
          </div>

          {/* Badges Display */}
          <div className="glass-panel p-3 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-gold to-warning rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs text-muted-foreground mb-1">Conquistas</div>
            <div className="text-lg font-bold text-gold">{userProfile.badges.length}</div>
          </div>

          {/* Streak Display */}
          <div className="glass-panel p-3 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-success to-success-light rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs text-muted-foreground mb-1">Sequência</div>
            <div className="text-lg font-bold text-success">3</div>
          </div>
        </div>

        {/* Recent Badges */}
        {userProfile.badges.length > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Últimas conquistas:</span>
            <div className="flex gap-1">
              {userProfile.badges.slice(-3).map((badge, index) => (
                <div 
                  key={index} 
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-warning flex items-center justify-center animate-pulse-glow-premium"
                  title={badge}
                >
                  <Star className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};