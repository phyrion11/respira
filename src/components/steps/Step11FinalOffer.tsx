import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Crown, Star, Zap, Shield, Trophy, CheckCircle, Clock, Users } from 'lucide-react';
import { StepWrapper } from '../StepWrapper';

interface Step11FinalOfferProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack?: () => void;
}

const Step11FinalOffer = ({ userProfile, onUpdateProfile, onNext, onBack }: Step11FinalOfferProps) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [utmParams, setUtmParams] = useState({
    source: 'direct',
    medium: 'none',
    campaign: 'none'
  });

  useEffect(() => {
    // Capture UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const capturedUtms = {
      source: urlParams.get('utm_source') || sessionStorage.getItem('utm_source') || 'direct',
      medium: urlParams.get('utm_medium') || sessionStorage.getItem('utm_medium') || 'none',
      campaign: urlParams.get('utm_campaign') || sessionStorage.getItem('utm_campaign') || 'none'
    };
    
    // Store in session storage
    sessionStorage.setItem('utm_source', capturedUtms.source);
    sessionStorage.setItem('utm_medium', capturedUtms.medium);
    sessionStorage.setItem('utm_campaign', capturedUtms.campaign);
    
    setUtmParams(capturedUtms);
  }, []);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCheckout = () => {
    // Track checkout event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        'value': 197,
        'currency': 'BRL',
        'items': [{
          'item_name': 'Respira Livre',
          'price': 197
        }]
      });
    }

    // Build checkout URL with UTM parameters
    const checkoutUrl = `https://pay.cakto.com.br/3bbrufk_643157?utm_source=${utmParams.source}&utm_medium=${utmParams.medium}&utm_campaign=${utmParams.campaign}`;
    
    // Open checkout in new tab
    window.open(checkoutUrl, '_blank');
  };

  const totalXP = userProfile.xp;
  const totalCoins = userProfile.respirCoins;
  const totalBadges = userProfile.badges.length;
  const completionLevel = Math.min(100, Math.floor((totalXP / 1000) * 100));

  return (
    <StepWrapper
      title="🏆 Parabéns pela Jornada!"
      subtitle="Seus resultados estão prontos. Veja sua solução personalizada"
      onBack={onBack}
    >
      <div className="space-y-6">
        {/* Results Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 premium-card bg-gradient-to-br from-gold/20 to-success/20 border-gold/40 flex items-center justify-center animate-float">
            <img 
              src="/assets/Logo_Respiralivre.png" 
              alt="Respira Livre" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <p className="text-muted-foreground">
            Baseado nas suas <span className="text-gold font-bold">{userProfile.badges.length} conquistas</span>
          </p>
        </div>

        {/* Personal Results Summary */}
        <div className="premium-card p-6 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold" />
            Seu Perfil de Liberdade
          </h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">{totalXP}</div>
              <div className="text-xs text-muted-foreground">XP Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{totalCoins}</div>
              <div className="text-xs text-muted-foreground">Coins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalBadges}</div>
              <div className="text-xs text-muted-foreground">Badges</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Nível de Prontidão</span>
              <span className="text-primary font-bold">{completionLevel}%</span>
            </div>
            <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-success transition-all duration-1000 animate-glow-pulse"
                style={{ width: `${completionLevel}%` }}
              />
            </div>
          </div>

          <div className="premium-card p-4 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
            <p className="text-sm font-bold text-success mb-1">Diagnóstico:</p>
            <p className="text-xs text-muted-foreground">
              Você está {completionLevel > 80 ? 'totalmente pronto' : completionLevel > 60 ? 'quase pronto' : 'no caminho certo'} para sua jornada de liberdade definitiva
            </p>
          </div>
        </div>

        {/* Product Presentation */}
        <div className="premium-card p-6 mb-6 border-gold/30">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 premium-card bg-gradient-to-br from-gold/20 to-success/20 border-gold/40 flex items-center justify-center">
              <Crown className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Respira Livre Premium
            </h2>
            <p className="text-muted-foreground text-sm">
              O método completo para sua liberdade definitiva
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">Sistema gamificado completo com 50+ desafios progressivos</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">Coach IA personalizado 24/7 baseado no seu perfil</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">Comunidade exclusiva de apoio com mentores certificados</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">Garantia de 30 dias - sua liberdade ou seu dinheiro de volta</p>
            </div>
          </div>

          {/* Price and Urgency */}
          <div className="premium-card p-4 bg-gradient-to-r from-gold/10 to-success/10 border-gold/20 mb-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground line-through">De R$ 497</p>
              <p className="text-3xl font-black text-gold mb-1">R$ 197</p>
              <p className="text-xs text-success font-bold">60% OFF - Oferta Especial</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="premium-card p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-red-400">Oferta expira em:</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-black text-red-400 countdown-timer">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="premium-card p-4 mb-6 bg-gradient-to-r from-primary/10 to-success/10 border-primary/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-primary font-bold">1.847 pessoas</span>
            </div>
            <span className="text-muted-foreground">conquistaram a liberdade esta semana</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCheckout}
          className="w-full btn-premium text-xl py-6 flex items-center justify-center gap-3 mb-4 animate-glow-pulse"
        >
          <Shield className="w-6 h-6" />
          Garantir Minha Liberdade Agora
        </button>

        {/* Security and Guarantee */}
        <div className="text-center space-y-2 animate-fade-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs text-success">Pagamento 100% Seguro</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-gold" />
            <span className="text-xs text-gold">Garantia de 30 dias</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Processamento seguro via Cakto • Seus dados estão protegidos
          </p>
        </div>
      </div>
    </StepWrapper>
  );
};

export default Step11FinalOffer;