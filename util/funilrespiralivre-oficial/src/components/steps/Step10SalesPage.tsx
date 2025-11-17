import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Trophy, Star, Zap, Crown, Sparkles, Award, TrendingUp, Lock, Unlock, CheckCircle2, Timer } from 'lucide-react';
import logo from '@/assets/logo-respiralivre.png';

interface Step10SalesPageProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const Step10SalesPage = ({ userProfile }: Step10SalesPageProps) => {
  const [showResults, setShowResults] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutos

  const totalScore = userProfile.xp;
  const totalBadges = userProfile.badges.length;
  const totalCoins = userProfile.respirCoins;
  const level = userProfile.level;
  
  // Classificação baseada em pontos
  const getClassification = () => {
    if (totalScore >= 500) return { 
      rank: 'ELITE LIBERDADE', 
      color: 'from-yellow-400 to-orange-500',
      icon: <Crown className="w-12 h-12" />,
      discount: 70,
      message: 'PARABÉNS! Você alcançou o nível MÁXIMO!'
    };
    if (totalScore >= 400) return { 
      rank: 'DIAMANTE', 
      color: 'from-cyan-400 to-blue-500',
      icon: <Trophy className="w-12 h-12" />,
      discount: 60,
      message: 'EXCEPCIONAL! Você está no TOP 5%!'
    };
    if (totalScore >= 300) return { 
      rank: 'PLATINA', 
      color: 'from-purple-400 to-pink-500',
      icon: <Star className="w-12 h-12" />,
      discount: 50,
      message: 'INCRÍVEL! Você está entre os melhores!'
    };
    if (totalScore >= 200) return { 
      rank: 'OURO', 
      color: 'from-yellow-300 to-yellow-600',
      icon: <Award className="w-12 h-12" />,
      discount: 40,
      message: 'MUITO BOM! Você tem grande potencial!'
    };
    return { 
      rank: 'PRATA', 
      color: 'from-gray-300 to-gray-500',
      icon: <Zap className="w-12 h-12" />,
      discount: 30,
      message: 'BOM TRABALHO! Continue assim!'
    };
  };

  const classification = getClassification();
  const originalPrice = 297.00;
  const discountedPrice = originalPrice * (1 - classification.discount / 100);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowResults(true), 800);
    const timer2 = setTimeout(() => setShowOffer(true), 2000);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(countdownInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-success/10 pb-20">
      {/* Header com Logo */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <img src={logo} alt="Respira Livre" className="h-10" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-success/20 border border-primary/30">
            <Timer className="w-4 h-4 text-primary" />
            <span className="font-mono font-bold text-primary">{formatTime(countdown)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8 space-y-8">
        {/* Resultado da Jornada */}
        <div className={`
          premium-card p-8 text-center transition-all duration-1000
          ${showResults ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-success/20 blur-3xl animate-pulse-glow" />
            <div className="relative">
              <div className={`
                inline-flex items-center justify-center w-24 h-24 rounded-full mb-4
                bg-gradient-to-br ${classification.color} shadow-2xl
                animate-bounce-slow
              `}>
                {classification.icon}
              </div>
              
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent animate-gradient-shift">
                {classification.rank}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {classification.message}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="glass-panel p-4">
                  <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{totalScore}</div>
                  <div className="text-xs text-muted-foreground">XP Total</div>
                </div>
                
                <div className="glass-panel p-4">
                  <Award className="w-6 h-6 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold text-success">{totalBadges}</div>
                  <div className="text-xs text-muted-foreground">Conquistas</div>
                </div>
                
                <div className="glass-panel p-4">
                  <Star className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gold">Nível {level}</div>
                  <div className="text-xs text-muted-foreground">Alcançado</div>
                </div>
              </div>

              {/* Badges Conquistadas */}
              <div className="glass-panel p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Suas Conquistas
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {userProfile.badges.map((badge, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/20 to-success/20 border border-primary/30 text-primary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oferta Especial */}
        <div className={`
          transition-all duration-1000 space-y-6
          ${showOffer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          {/* Título da Oferta */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-destructive/20 to-warning/20 border border-destructive/30 mb-4">
              <Unlock className="w-4 h-4 text-destructive" />
              <span className="text-sm font-bold text-destructive">OFERTA EXCLUSIVA DESBLOQUEADA</span>
            </div>
            
            <h2 className="text-3xl font-bold">
              Sua Classificação Desbloqueou
              <span className="block text-4xl bg-gradient-to-r from-success via-primary to-success bg-clip-text text-transparent">
                {classification.discount}% DE DESCONTO
              </span>
            </h2>
            
            <p className="text-muted-foreground">
              Apenas para quem completou a jornada como você
            </p>
          </div>

          {/* Preço */}
          <div className="premium-card p-6 text-center">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground line-through mb-1">
                  De R$ {originalPrice.toFixed(2)}
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
                  R$ {discountedPrice.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ou 12x de R$ {(discountedPrice / 12).toFixed(2)}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 border border-success/30">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-bold text-success">
                  Você economizou R$ {(originalPrice - discountedPrice).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Benefícios */}
          <div className="premium-card p-6 space-y-4">
            <h3 className="font-bold text-lg text-center mb-4">
              O que você ganha com o Respira Livre:
            </h3>
            
            {[
              'Acompanhamento diário personalizado',
              'Desafios gamificados exclusivos',
              'Comunidade de apoio 24/7',
              'Técnicas comprovadas de cessação',
              'Tracking de economia em tempo real',
              'Sistema de recompensas premium',
              'Suporte profissional ilimitado',
              'Garantia de 7 dias ou seu dinheiro de volta'
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Principal */}
          <button
            onClick={() => window.open('https://pay.hotmart.com/...', '_blank')}
            className="w-full relative overflow-hidden group"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--success)) 50%, hsl(var(--primary)) 100%)',
              backgroundSize: '200% 100%',
              animation: 'gradient-shift 3s ease infinite',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: 'none',
              boxShadow: '0 10px 40px -10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--success) / 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-white font-bold text-lg">
              <Unlock className="w-6 h-6" />
              GARANTIR MINHA VAGA COM {classification.discount}% OFF
            </span>
          </button>

          {/* Urgência */}
          <div className="glass-panel p-4 text-center border-destructive/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-destructive" />
              <span className="text-sm font-bold text-destructive">
                Esta oferta expira em {formatTime(countdown)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Após o tempo, você perde seu desconto exclusivo de {classification.discount}%
            </p>
          </div>

          {/* Garantia */}
          <div className="text-center space-y-2 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">
                Garantia de 7 dias • Pagamento 100% Seguro
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
