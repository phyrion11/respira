import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { StepWrapper } from '../StepWrapper';
import { 
  Trophy, 
  Target, 
  Calendar, 
  DollarSign, 
  Heart, 
  Download, 
  Share2,
  Sparkles
} from 'lucide-react';

interface Step7ResultsProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const Step7Results = ({ userProfile, onUpdateProfile }: Step7ResultsProps) => {
  const [showCelebration, setShowCelebration] = useState(false);
  
  const monthlySpend = userProfile.monthlySpend;
  const dreamPrice = userProfile.selectedDream?.price || 0;
  const monthsToReachDream = dreamPrice / monthlySpend;
  const yearlySpend = monthlySpend * 12;
  const fiveYearSpend = monthlySpend * 60;

  useEffect(() => {
    // Celebration effect on mount
    const timer = setTimeout(() => setShowCelebration(true), 500);
    
    // Award final badges and XP
    onUpdateProfile({ 
      xp: userProfile.xp + 100,
      badges: [...userProfile.badges, 'Jornada Completa', 'Visionário do Futuro'] 
    });

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPlan = () => {
    // Simulate download
    alert('Seu plano personalizado foi baixado!');
  };

  const handleShare = () => {
    // Simulate share
    alert('Compartilhado nas redes sociais!');
  };

  return (
    <StepWrapper 
      title="Sua Jornada Completa" 
      subtitle="Veja o que você pode conquistar!"
    >
      <div className="space-y-6">
        {/* Achievement Card */}
        <div className={`
          premium-card p-6 bg-gradient-to-br from-primary/20 to-dream/20 
          border-primary/30 text-center
          ${showCelebration ? 'celebrate-premium' : ''}
        `}>
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gradient mb-2">
            Parabéns!
          </h2>
          <p className="text-muted-foreground">
            Você completou seu plano personalizado para parar de fumar
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold">+100 XP</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Dream Achievement */}
          <div className="premium-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-dream" />
              <h3 className="font-bold text-sm">Seu Sonho</h3>
            </div>
            <div className="text-xl font-bold text-dream">
              {monthsToReachDream.toFixed(1)} meses
            </div>
            <p className="text-xs text-muted-foreground">
              Para realizar {userProfile.selectedDream?.name}
            </p>
          </div>

          {/* Yearly Savings */}
          <div className="premium-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-success" />
              <h3 className="font-bold text-sm">Economia Anual</h3>
            </div>
            <div className="text-xl font-bold text-success">
              R$ {yearlySpend.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              Dinheiro que você pode investir
            </p>
          </div>

          {/* Health Benefits */}
          <div className="premium-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-sm">Saúde</h3>
            </div>
            <div className="text-lg font-bold text-red-500">
              Imediata
            </div>
            <p className="text-xs text-muted-foreground">
              Melhora já nas primeiras 24h
            </p>
          </div>

          {/* Long-term Savings */}
          <div className="premium-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-gold" />
              <h3 className="font-bold text-sm">5 Anos</h3>
            </div>
            <div className="text-lg font-bold text-gold">
              R$ {(fiveYearSpend / 1000).toFixed(0)}k
            </div>
            <p className="text-xs text-muted-foreground">
              Economia total em 5 anos
            </p>
          </div>
        </div>

        {/* Achievements Summary */}
        <div className="premium-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Suas Conquistas
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">XP Total</span>
              <span className="font-bold text-primary">{userProfile.xp} XP</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Badges Conquistadas</span>
              <span className="font-bold text-gold">{userProfile.badges.length}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nível Alcançado</span>
              <span className="font-bold text-dream">Iniciante Motivado</span>
            </div>
          </div>

          {/* Latest Badges */}
          <div className="mt-4 p-3 bg-gradient-to-r from-gold/10 to-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Últimas badges:</p>
            <div className="flex flex-wrap gap-2">
              {userProfile.badges.slice(-3).map((badge, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary/20 rounded-full text-xs text-primary border border-primary/30"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadPlan}
            className="w-full button-premium flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            Baixar Meu Plano Personalizado
          </button>

          <button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-secondary to-muted text-foreground px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar Minha Jornada
          </button>
        </div>

        {/* Progress Indicator - All Complete */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        </div>
      </div>
    </StepWrapper>
  );
};