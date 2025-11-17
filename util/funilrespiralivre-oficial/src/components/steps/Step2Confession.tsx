import { useState, useEffect } from 'react';
import { Cigarette, TrendingDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepWrapper } from '@/components/StepWrapper';
import { XPAnimation } from '@/components/XPAnimation';
import { UserProfile } from '@/types/funnel';

interface Step2ConfessionProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

export const Step2Confession = ({ userProfile, onUpdateProfile, onNext }: Step2ConfessionProps) => {
  const [monthlySpend, setMonthlySpend] = useState(300);
  const [confirmed, setConfirmed] = useState(false);
  const [showXP, setShowXP] = useState(false);

  const dailyCost = monthlySpend / 30;
  const yearlyCost = monthlySpend * 12;

  const getShockPhrase = (amount: number) => {
    if (amount <= 200) return "Todo mês você queima o suficiente para um jantar especial 🍽️";
    if (amount <= 400) return "Mensalmente você literalmente queima um tênis novo 👟";
    if (amount <= 600) return "A cada mês você queima quase uma Smart TV 📺";
    return "Mensalmente você está queimando mais que um iPhone novo! 📱";
  };

  const getSocialProof = (amount: number) => {
    if (amount <= 200) return "68% dos usuários gastam nessa faixa";
    if (amount <= 400) return "45% dos usuários gastam nessa faixa";
    if (amount <= 600) return "23% dos usuários gastam nessa faixa";
    return "Apenas 12% dos usuários gastam tanto quanto você";
  };

  const handleConfirm = () => {
    onUpdateProfile({
      monthlySpend,
      xp: userProfile.xp + 50,
    });
    setConfirmed(true);
    setShowXP(true);
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <>
      {showXP && <XPAnimation points={50} onComplete={() => setShowXP(false)} />}
      
      <StepWrapper
        title="Hora da Verdade"
        subtitle="Quanto você realmente gasta com cigarro por mês?"
      >
        <div className="premium-card p-8">
          {!confirmed ? (
            <>
              {/* Enhanced Slider Section */}
              <div className="mb-10">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-gradient mb-3 shimmer">
                    R$ {monthlySpend.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-lg text-muted-foreground">queimados todo mês</div>
                  <div className="flex justify-center gap-2 mt-4">
                    <div className="w-2 h-2 bg-smoking rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>

                <div className="relative mb-8">
                  <div className="glass-panel p-6 rounded-2xl">
                    <input
                      type="range"
                      min="150"
                      max="800"
                      step="25"
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(Number(e.target.value))}
                      className="w-full slider-premium cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-4">
                      <span className="font-semibold">R$ 150</span>
                      <span className="font-semibold">R$ 800+</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Shock Factor */}
                <div className="danger-zone-premium rounded-2xl p-6 mb-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <Cigarette className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-xl mb-2 text-white">{getShockPhrase(monthlySpend)}</div>
                  <div className="text-white/80 text-sm">Imagine o que você poderia fazer com esse dinheiro...</div>
                </div>

                {/* Enhanced Breakdown Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="glass-panel bg-smoking/10 border border-smoking/30 rounded-xl p-6 text-center group hover:scale-105 transition-transform">
                    <div className="w-12 h-12 mx-auto mb-3 bg-smoking/20 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-smoking" />
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">Por dia</div>
                    <div className="font-bold text-xl text-smoking">R$ {dailyCost.toFixed(2)}</div>
                  </div>
                  <div className="glass-panel bg-smoking/10 border border-smoking/30 rounded-xl p-6 text-center group hover:scale-105 transition-transform">
                    <div className="w-12 h-12 mx-auto mb-3 bg-smoking/20 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-smoking" />
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">Por ano</div>
                    <div className="font-bold text-xl text-smoking">R$ {yearlyCost.toLocaleString('pt-BR')}</div>
                  </div>
                </div>

                {/* Enhanced Social Proof */}
                <div className="glass-panel bg-primary/10 border border-primary/30 rounded-xl p-6 text-center mb-8">
                  <div className="text-base text-primary font-semibold mb-2">
                    📊 {getSocialProof(monthlySpend)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Você não está sozinho nessa jornada
                  </div>
                </div>

                <div className="button-premium w-full" onClick={handleConfirm}>
                  <span className="flex items-center justify-center gap-2">
                    Sim, gasto isso mesmo
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center celebrate-premium">
              <div className="text-8xl mb-6 float">✅</div>
              <h3 className="text-3xl font-bold text-gradient mb-4">Obrigado pela Honestidade!</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-sm mx-auto">
                Reconhecer o problema é o primeiro passo para a solução.
                Agora vamos transformar esses gastos em sonhos realizados!
              </p>

              <div className="glass-panel bg-success/20 border border-success/30 rounded-xl p-6 mb-8">
                <div className="text-success font-bold text-2xl mb-2">+50 XP pela coragem! 🎉</div>
                <div className="text-sm text-success font-semibold">Badge: Corajoso e Honesto</div>
                <div className="challenge-badge mt-3 inline-block">
                  Primeiro passo conquistado!
                </div>
              </div>

              <div className="button-premium w-full" onClick={handleContinue}>
                <span className="flex items-center justify-center gap-2">
                  Vamos aos Sonhos!
                  <ChevronRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          )}
        </div>
      </StepWrapper>
    </>
  );
};