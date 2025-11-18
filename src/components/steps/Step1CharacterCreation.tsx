import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { Crown, Zap, Shield, Heart, Target, Gamepad2, Star, Sparkles } from 'lucide-react';

interface Step1CharacterCreationProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

const archetypes = [
  {
    id: 'guerreiro',
    name: 'Guerreiro',
    avatar: '⚔️',
    description: 'Enfrenta desafios de frente com determinação férrea',
    traits: ['Disciplinado', 'Corajoso', 'Persistente'],  
    bonus: '+20% XP em desafios',
    color: 'from-smoking to-smoking-dark',
    icon: Shield,
    glow: 'shadow-smoking/40'
  },
  {
    id: 'estrategista',
    name: 'Estrategista',
    avatar: '🧠',
    description: 'Planeja cada passo rumo à liberdade com sabedoria',
    traits: ['Analítico', 'Paciente', 'Calculista'],
    bonus: '+15% Coins por dia',
    color: 'from-primary to-success',
    icon: Target,
    glow: 'shadow-primary/40'
  },
  {
    id: 'inspirador',
    name: 'Inspirador',
    avatar: '✨',
    description: 'Motiva outros e encontra força na comunidade',
    traits: ['Carismático', 'Empático', 'Líder'],
    bonus: '+25% XP em Squad',
    color: 'from-gold to-gold-light',
    icon: Crown,
    glow: 'shadow-gold/40'
  },
  {
    id: 'resiliente',
    name: 'Resiliente',
    avatar: '💪',
    description: 'Supera recaídas e transforma fracassos em aprendizado',
    traits: ['Adaptável', 'Forte', 'Otimista'],
    bonus: '+50% XP em recomeços',
    color: 'from-success to-primary',
    icon: Heart,
    glow: 'shadow-success/40'
  }
];

const Step1CharacterCreation = ({ userProfile, onUpdateProfile, onNext }: Step1CharacterCreationProps) => {
  const [nickname, setNickname] = useState(userProfile.nickname || '');
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(userProfile.archetype);
  const [showArchetypes, setShowArchetypes] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showError, setShowError] = useState(false);

  // Mostrar arquétipos quando nome for preenchido
  useEffect(() => {
    if (nickname.trim().length >= 3) {
      const timer = setTimeout(() => {
        setShowArchetypes(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowArchetypes(false);
    }
  }, [nickname]);

  const handleArchetypeSelect = (archetypeId: string) => {
    setIsSelecting(true);
    setSelectedArchetype(archetypeId);
    
    // Animação completa antes de permitir prosseguir
    setTimeout(() => {
      setIsSelecting(false);
    }, 600);
  };

  const handleNext = () => {
    if (!nickname.trim() || nickname.trim().length < 3) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!selectedArchetype) {
      return;
    }

    const archetype = archetypes.find(a => a.id === selectedArchetype);
    onUpdateProfile({
      nickname: nickname.trim(),
      archetype: selectedArchetype as any,
      avatar: archetype?.avatar || '⚔️',
      xp: 50,
      respirCoins: 100,
      badges: ['Primeiro Passo']
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Status Bar - iOS Style */}
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

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 px-6 py-8">
        <div className="max-w-sm mx-auto">
          {/* Hero Section - Premium */}
          <div className="text-center mb-8 animate-fade-up">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-3xl p-4 animate-float" style={{
                background: 'var(--gradient-glass)',
                backdropFilter: 'var(--backdrop-blur)',
                boxShadow: 'var(--shadow-premium)'
              }}>
                <img 
                  src="/assets/Logo_Respiralivre.png" 
                  alt="Respira Livre" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl font-black mb-4 leading-tight">
              <span style={{ 
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Respira
              </span>{' '}
              <span style={{ 
                background: 'var(--gradient-gold)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Livre
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xs mx-auto">
              O primeiro jogo que te vicia em{' '}
              <span className="font-bold text-primary">NÃO FUMAR</span>
            </p>
          </div>

          {/* Premium Nickname Input */}
          <div className="mb-8 animate-fade-up" style={{animationDelay: '0.2s'}}>
            <label className="text-sm font-semibold text-foreground mb-3 block flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-primary" />
              Como quer ser chamado?
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Seu apelido de guerreiro..."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={`w-full h-14 px-4 text-lg font-medium rounded-2xl border transition-all duration-300 ${
                  showError 
                    ? 'border-smoking/50 animate-glow-pulse' 
                    : nickname.trim().length >= 3
                    ? 'border-primary/30'
                    : 'border-white/10'
                }`}
                style={{
                  background: 'var(--gradient-glass)',
                  backdropFilter: 'var(--backdrop-blur)',
                  boxShadow: showError ? 'var(--shadow-glow-primary)' : 'var(--shadow-glass)'
                }}
                maxLength={20}
              />
              <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                nickname.trim().length >= 3 ? 'text-primary scale-110' : 'text-muted-foreground'
              }`}>
                {nickname.trim().length >= 3 ? (
                  <Sparkles className="w-5 h-5 animate-pulse" />
                ) : (
                  <Gamepad2 className="w-5 h-5" />
                )}
              </div>
            </div>
            {showError && (
              <div className="mt-3 p-3 rounded-xl border border-smoking/30 animate-bounce-in" style={{
                background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.05) 100%)',
                backdropFilter: 'var(--backdrop-blur)'
              }}>
                <p className="text-sm text-smoking font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Digite seu nome de guerreiro para continuar!
                </p>
              </div>
            )}
            {nickname && nickname.length < 3 && !showError && (
              <p className="text-xs text-warning mt-2 animate-pulse">
                Precisa ter pelo menos 3 caracteres
              </p>
            )}
          </div>

          {/* Premium Archetype Grid - Aparece com animação */}
          {showArchetypes && (
            <div className="mb-8 animate-fade-up" style={{animationDelay: '0.3s'}}>
              <h2 className="text-lg font-bold text-center mb-6 flex items-center justify-center gap-2">
                <Crown className="w-5 h-5 text-gold" />
                <span style={{ 
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Escolha seu Arquétipo
                </span>
              </h2>
              
              <div className="space-y-4 relative">
                {archetypes.map((archetype, index) => {
                  const Icon = archetype.icon;
                  const isSelected = selectedArchetype === archetype.id;
                  const isOther = selectedArchetype && selectedArchetype !== archetype.id;
                  
                  return (
                    <div
                      key={archetype.id}
                      onClick={() => handleArchetypeSelect(archetype.id)}
                      className={`relative p-5 rounded-3xl border cursor-pointer transition-all duration-500 ${
                        isSelected 
                          ? 'border-primary/50 scale-105 z-10' 
                          : isOther && isSelecting
                          ? 'opacity-0 scale-95 -mt-24'
                          : isOther
                          ? 'opacity-30 scale-95'
                          : 'border-white/10 hover:border-white/20 hover:scale-[1.02]'
                      }`}
                      style={{
                        background: isSelected 
                          ? 'linear-gradient(135deg, rgba(120, 255, 120, 0.15) 0%, rgba(120, 255, 120, 0.05) 100%)'
                          : 'var(--gradient-glass)',
                        backdropFilter: 'var(--backdrop-blur)',
                        boxShadow: isSelected 
                          ? 'var(--shadow-glow-primary)' 
                          : 'var(--shadow-glass)',
                        transform: isOther && isSelecting 
                          ? `translateY(${-100 * (index > archetypes.findIndex(a => a.id === selectedArchetype) ? 1 : -1)}px)`
                          : undefined,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* 3D Icon */}
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${archetype.color} flex items-center justify-center overflow-hidden transition-transform duration-300 ${
                          isSelected ? 'scale-110' : ''
                        }`}>
                          <Icon className="w-8 h-8 text-white relative z-10" />
                          <div className="text-2xl absolute z-20">{archetype.avatar}</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                          {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent animate-shimmer"></div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-bold text-foreground">{archetype.name}</h4>
                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-bounce-in">
                                <Zap className="w-4 h-4 text-background" />
                              </div>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                            {archetype.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {archetype.traits.map((trait) => (
                                <span 
                                  key={trait}
                                  className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-lg border border-primary/20"
                                >
                                  {trait}
                                </span>
                              ))}
                            </div>
                            
                            <div className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-gradient-to-r ${archetype.color} text-white rounded-full shadow-lg`}>
                              <Star className="w-3 h-3" />
                              {archetype.bonus}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Premium Continue Button */}
          {nickname.trim().length >= 3 && selectedArchetype && !isSelecting && (
            <div className="animate-bounce-in">
              <button 
                onClick={handleNext}
                className="w-full px-8 py-5 rounded-2xl font-bold text-lg relative overflow-hidden group"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-glow-primary)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(120, 255, 120, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Começar Jornada
                  <div className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                    +50 XP
                  </div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              
              {/* Trust indicators */}
              <div className="mt-4 text-center animate-fade-up" style={{animationDelay: '0.2s'}}>
                <p className="text-xs text-muted-foreground">
                  Junte-se a <span className="text-primary font-bold">+1.847 pessoas</span> esta semana
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1CharacterCreation;
