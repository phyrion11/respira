
import { useState } from 'react';
import { UserProfile } from '@/types/funnel';
import { Users, Crown, Zap, Trophy, ArrowRight, X } from 'lucide-react';

interface Step4SquadInviteProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

const mockSquads = [
  {
    id: 'warriors',
    name: 'Guerreiros da Liberdade',
    members: 7,
    maxMembers: 8,
    avgStreak: 15,
    totalXP: 12450,
    leader: 'CaçadorDeVícios',
    description: 'Squad focado em competição e desafios extremos',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'zen',
    name: 'Mente Zen',
    members: 5,
    maxMembers: 8,
    avgStreak: 23,
    totalXP: 8930,
    leader: 'MestreCalmo',
    description: 'Apoio mútuo e técnicas de mindfulness',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'achievers',
    name: 'Coletores de Badges',
    members: 6,
    maxMembers: 8,
    avgStreak: 18,
    totalXP: 15670,
    leader: 'BadgeHunter',
    description: 'Focados em completar todos os desafios',
    color: 'from-yellow-500 to-gold'
  }
];

export const Step4SquadInvite = ({ userProfile, onUpdateProfile, onNext }: Step4SquadInviteProps) => {
  const [selectedSquad, setSelectedSquad] = useState<string | null>(null);
  const [showSolo, setShowSolo] = useState(false);

  const handleJoinSquad = () => {
    onUpdateProfile({
      joinedSquad: true,
      xp: userProfile.xp + 100,
      respirCoins: userProfile.respirCoins + 150,
      badges: [...userProfile.badges, 'Jogador de Equipe']
    });
    onNext();
  };

  const handleGoSolo = () => {
    onUpdateProfile({
      joinedSquad: false,
      xp: userProfile.xp + 50,
      respirCoins: userProfile.respirCoins + 50,
      badges: [...userProfile.badges, 'Lobo Solitário']
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
        
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🤝</div>
          <h1 className="text-3xl font-bold text-gradient mb-4">
            Entre para um Squad
          </h1>
          <p className="text-muted-foreground">
            Squads aumentam suas chances de sucesso em <span className="text-primary font-bold">3x</span>
          </p>
        </div>

        {!showSolo ? (
          <>
            <div className="space-y-4 mb-6">
              {mockSquads.map((squad) => (
                <div
                  key={squad.id}
                  onClick={() => setSelectedSquad(squad.id)}
                  className={`
                    premium-card p-5 cursor-pointer transition-all duration-300
                    ${selectedSquad === squad.id 
                      ? 'border-primary/50 shadow-lg scale-102' 
                      : 'hover:border-primary/30 hover:scale-101'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-16 h-16 rounded-xl flex items-center justify-center text-2xl
                      bg-gradient-to-br ${squad.color} text-white font-bold
                    `}>
                      {squad.name[0]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-foreground">
                          {squad.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {squad.members}/{squad.maxMembers}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {squad.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center">
                          <div className="font-bold text-success">{squad.avgStreak} dias</div>
                          <div className="text-muted-foreground">Avg Streak</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-primary">{squad.totalXP.toLocaleString()}</div>
                          <div className="text-muted-foreground">Total XP</div>
                        </div>
                        <div className="text-center">
                          <Crown className="w-4 h-4 text-gold mx-auto" />
                          <div className="text-muted-foreground text-xs">{squad.leader}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {selectedSquad && (
                <button
                  onClick={handleJoinSquad}
                  className="w-full bg-gradient-to-r from-primary via-success to-primary text-white px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
                  style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 3s ease infinite',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  <Users className="w-6 h-6" />
                  Entrar no Squad
                  <div className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                    +100 XP + 150 Coins
                  </div>
                </button>
              )}

              <button
                onClick={() => setShowSolo(true)}
                className="w-full bg-gradient-to-r from-muted to-secondary text-foreground px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform"
              >
                Jogar Solo (por enquanto)
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="premium-card p-8 mb-6">
              <div className="text-4xl mb-4">🐺</div>
              <h3 className="text-xl font-bold mb-4">Modo Solo Ativado</h3>
              <p className="text-muted-foreground mb-6">
                Você pode entrar em um Squad a qualquer momento. 
                Estatísticas mostram que jogadores em squad têm 3x mais chances de sucesso.
              </p>
              <div className="bg-warning/20 border border-warning/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-warning">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold">Aviso</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Sem squad, você perde acesso a challenges especiais e bônus de XP em grupo.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoSolo}
                className="w-full bg-gradient-to-r from-secondary to-muted text-foreground px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-6 h-6" />
                Continuar Solo
                <div className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                  +50 XP
                </div>
              </button>
              
              <button
                onClick={() => setShowSolo(false)}
                className="w-full text-primary px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform"
              >
                <X className="w-5 h-5" />
                Voltar para Squads
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
