import { useState } from 'react';
import { UserProfile } from '@/types/funnel';
import { Sparkles, User, Crown, Zap } from 'lucide-react';

interface Step1CharacterCreationProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

const Step1CharacterCreation = ({ userProfile, onUpdateProfile, onNext }: Step1CharacterCreationProps) => {
  const [nickname, setNickname] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleStart = () => {
    if (nickname.trim()) {
      setIsCreating(true);
      setTimeout(() => {
        onUpdateProfile({
          nickname: nickname.trim(),
          xp: 50,
          respirCoins: 100,
          level: 1,
          badges: ['Primeiro Passo'],
          streak: 0
        });
        onNext();
      }, 2000);
    }
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="premium-card p-8">
            <div className="animate-spin w-16 h-16 mx-auto mb-6">
              <img 
                src="/assets/Logo_Respiralivre.png" 
                alt="Respira Livre" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gradient mb-4">
              Criando seu perfil...
            </h2>
            <p className="text-muted-foreground">
              Preparando sua jornada de liberdade, {nickname}!
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
        
        {/* Hero Section */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto mb-6 premium-card p-4 bg-gradient-to-br from-primary/10 to-success/10">
            <img 
              src="/assets/Logo_Respiralivre.png" 
              alt="Respira Livre" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h1 className="text-4xl font-black text-gradient mb-4">
            Respira Livre
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Sua jornada para a liberdade começa agora
          </p>
          <p className="text-sm text-muted-foreground">
            Transforme sua vida em um jogo que você vai querer vencer
          </p>
        </div>

        {/* Character Creation Card */}
        <div className="premium-card p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 premium-card p-3 bg-gradient-to-br from-gold/20 to-gold/10 border-gold/30">
              <Crown className="w-full h-full text-gold" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Crie Seu Personagem
            </h2>
            <p className="text-muted-foreground">
              Como você gostaria de ser chamado nesta jornada?
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Seu nome de guerreiro
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Ex: Guerreiro da Liberdade"
                  className="w-full pl-10 pr-4 py-4 rounded-2xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  maxLength={20}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Este será seu nome durante toda a jornada
              </p>
            </div>
          </div>
        </div>

        {/* Rewards Preview */}
        <div className="premium-card p-4 mb-6 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <h3 className="font-bold text-success mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Recompensas de Início
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl font-bold text-gold">+50</div>
              <div className="text-xs text-muted-foreground">XP</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">+100</div>
              <div className="text-xs text-muted-foreground">Coins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">1º</div>
              <div className="text-xs text-muted-foreground">Badge</div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!nickname.trim()}
          className={`
            w-full premium-button text-lg flex items-center justify-center gap-3 
            ${!nickname.trim() 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-105 active:scale-95'
            }
          `}
        >
          <Zap className="w-6 h-6" />
          Começar Jornada
          <div className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
            +50 XP
          </div>
        </button>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Junte-se a milhares de pessoas que já conquistaram sua liberdade
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success">+1.847 pessoas esta semana</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1CharacterCreation;