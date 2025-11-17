import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/funnel';
import { dreamCatalog } from '@/data/dreams';
import { Target, Coins, Calendar, Trophy, Sparkles } from 'lucide-react';

interface Step3QuestSelectionProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

export const Step3QuestSelection = ({ userProfile, onUpdateProfile, onNext }: Step3QuestSelectionProps) => {
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [questData, setQuestData] = useState<any>(null);

  const userQuests = dreamCatalog.filter(dream => 
    userProfile.archetype ? dream.category === userProfile.archetype : true
  ).slice(0, 4);

  useEffect(() => {
    if (selectedQuest && isAnalyzing) {
      setTimeout(() => {
        const monthsToComplete = selectedQuest.price / (userProfile.monthlySpend || 300);
        setQuestData({
          timeToComplete: monthsToComplete,
          totalSavings: selectedQuest.price,
          difficulty: monthsToComplete > 12 ? 'Épica' : monthsToComplete > 6 ? 'Difícil' : 'Normal',
          xpReward: Math.floor(selectedQuest.price / 100),
          dailyProgress: (userProfile.monthlySpend || 300) / 30
        });
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [selectedQuest, isAnalyzing, userProfile.monthlySpend]);

  const handleQuestSelect = (quest: any) => {
    setSelectedQuest(quest);
    setIsAnalyzing(true);
    setQuestData(null);
  };

  const handleAcceptQuest = () => {
    onUpdateProfile({ 
      selectedDream: selectedQuest,
      xp: userProfile.xp + 100,
      badges: [...userProfile.badges, 'Caçador de Sonhos', `Quest: ${selectedQuest.name}`] 
    });
    onNext();
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background relative overflow-hidden">
      <div className="relative z-10 p-4">
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-dream/20 to-primary/20 rounded-full border border-dream/30 mb-4">
            <span className="text-sm font-bold text-dream">SELEÇÃO DE QUEST</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Escolha Sua Missão
          </h1>
          <p className="text-muted-foreground">Que recompensa épica você quer conquistar?</p>
        </div>

        {!selectedQuest && (
          <div className="max-w-sm mx-auto space-y-3">
            {userQuests.map((quest, index) => (
              <div
                key={quest.id}
                onClick={() => handleQuestSelect(quest)}
                className="premium-card p-4 cursor-pointer hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-dream/20 rounded-xl flex items-center justify-center text-2xl border border-primary/20">
                    {quest.category === 'tech-lover' && '📱'}
                    {quest.category === 'adventurer' && '🗺️'}
                    {quest.category === 'family-first' && '👨‍👩‍👧‍👦'}
                    {quest.category === 'luxury-seeker' && '💎'}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-1">{quest.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Coins className="w-4 h-4 text-gold" />
                      <span className="text-sm font-bold text-gold">
                        R$ {quest.price.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{quest.description}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-primary font-bold">Quest</div>
                    <Target className="w-5 h-5 text-primary mx-auto mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedQuest && isAnalyzing && (
          <div className="max-w-sm mx-auto">
            <div className="premium-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-dream/20 rounded-xl flex items-center justify-center border border-primary/20">
                <div className="animate-spin">⚡</div>
              </div>
              <h3 className="text-xl font-bold text-gradient mb-2">Analisando Quest...</h3>
              <p className="text-muted-foreground">Calculando dificuldade e recompensas</p>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-dream rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {selectedQuest && questData && !isAnalyzing && (
          <div className="max-w-sm mx-auto fade-up-premium">
            {/* Quest Card */}
            <div className="premium-card p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">
                  {selectedQuest.category === 'tech-lover' && '📱'}
                  {selectedQuest.category === 'adventurer' && '🗺️'}
                  {selectedQuest.category === 'family-first' && '👨‍👩‍👧‍👦'}
                  {selectedQuest.category === 'luxury-seeker' && '💎'}
                </div>
                <h3 className="text-xl font-bold text-gradient mb-1">{selectedQuest.name}</h3>
                <div className={`
                  inline-block px-3 py-1 rounded-full text-xs font-bold
                  ${questData.difficulty === 'Épica' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    questData.difficulty === 'Difícil' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    'bg-green-500/20 text-green-400 border border-green-500/30'}
                `}>
                  Quest {questData.difficulty}
                </div>
              </div>

              {/* Quest Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-muted/50 to-secondary/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Tempo para completar</span>
                  <span className="font-bold text-primary">{questData.timeToComplete.toFixed(1)} meses</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-muted/50 to-secondary/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Progresso diário</span>
                  <span className="font-bold text-success">R$ {questData.dailyProgress.toFixed(0)}</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-muted/50 to-secondary/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Recompensa XP</span>
                  <span className="font-bold text-gold">{questData.xpReward} XP</span>
                </div>
              </div>

              {/* Emotional Reward */}
              <div className="p-4 bg-gradient-to-r from-dream/10 to-primary/10 rounded-lg border border-dream/20 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-dream" />
                  <span className="text-sm font-bold text-dream">Recompensa Emocional</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedQuest.emotionalBenefit}</p>
              </div>

              <button
                onClick={handleAcceptQuest}
                className="w-full button-premium flex items-center justify-center gap-3"
              >
                <Trophy className="w-5 h-5" />
                Aceitar Quest
                <div className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                  +100 XP
                </div>
              </button>
            </div>

            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedQuest(null);
                setQuestData(null);
                setIsAnalyzing(false);
              }}
              className="w-full bg-gradient-to-r from-secondary to-muted text-foreground px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Escolher Outra Quest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};