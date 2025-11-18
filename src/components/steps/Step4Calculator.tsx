import { useState } from 'react';
import { StepWrapper } from '../StepWrapper';
import { Calculator, DollarSign, TrendingUp, AlertCircle, Cigarette, Package, Zap, Heart, Brain, Clock, Banknote } from 'lucide-react';

interface Step4CalculatorProps {
  onNext: () => void;
  onBack?: () => void;
  onUpdateScore: (points: number) => void;
  onUpdateProgress: (data: any) => void;
  characterData: any;
}

type InputMode = 'cigarettes' | 'packs';

// Estatísticas científicas não óbvias
const healthImpacts = [
  {
    icon: Brain,
    stat: '40% maior',
    description: 'Risco de ansiedade e depressão clínica',
    source: 'Journal of Psychiatric Research 2021'
  },
  {
    icon: Heart,
    stat: '3x mais',
    description: 'Chances de disfunção erétil',
    source: 'American Journal of Epidemiology'
  },
  {
    icon: Clock,
    stat: '-14 anos',
    description: 'Redução média de expectativa de vida',
    source: 'British Medical Journal'
  },
  {
    icon: AlertCircle,
    stat: '60% menos',
    description: 'Produtividade no trabalho',
    source: 'Occupational Medicine 2020'
  }
];

// Equivalências materiais baseadas em valores reais
const getEquivalences = (yearlyAmount: number) => {
  const equivalences = [];
  
  if (yearlyAmount >= 1200) {
    equivalences.push({ item: 'iPhone 15 Pro', value: 7000, icon: '📱' });
  }
  if (yearlyAmount >= 2400) {
    equivalences.push({ item: 'Viagem para o Nordeste (7 dias)', value: 2500, icon: '✈️' });
  }
  if (yearlyAmount >= 3600) {
    equivalences.push({ item: 'Notebook Dell Gamer', value: 4500, icon: '💻' });
  }
  if (yearlyAmount >= 4800) {
    equivalences.push({ item: 'Curso de Pós-Graduação', value: 5000, icon: '🎓' });
  }
  if (yearlyAmount >= 6000) {
    equivalences.push({ item: 'Moto Honda CG 160', value: 14000, icon: '🏍️' });
  }
  if (yearlyAmount >= 7200) {
    equivalences.push({ item: 'Entrada de Apartamento', value: 15000, icon: '🏠' });
  }
  
  return equivalences.slice(0, 6);
};

const Step4Calculator = ({ 
  onNext, 
  onBack,
  onUpdateScore, 
  onUpdateProgress,
  characterData 
}: Step4CalculatorProps) => {
  const [inputMode, setInputMode] = useState<InputMode>('cigarettes');
  const [cigarettesPerDay, setCigarettesPerDay] = useState(20);
  const [packsPerDay, setPacksPerDay] = useState(1);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const CIGARETTES_PER_PACK = 20;

  // Cálculos precisos
  const actualCigarettesPerDay = inputMode === 'packs' 
    ? packsPerDay * CIGARETTES_PER_PACK 
    : cigarettesPerDay;

  const dailyCostInReais = inputMode === 'packs'
    ? packsPerDay * pricePerUnit
    : (actualCigarettesPerDay / CIGARETTES_PER_PACK) * pricePerUnit;

  const monthlyCigarettes = actualCigarettesPerDay * 30;
  const yearlyCigarettes = actualCigarettesPerDay * 365;
  
  const monthlyCost = dailyCostInReais * 30;
  const yearlyCost = dailyCostInReais * 365;
  const fiveYearCost = yearlyCost * 5;
  const tenYearCost = yearlyCost * 10;

  const handleCalculate = () => {
    if (pricePerUnit === 0) {
      alert('Por favor, ajuste o preço');
      return;
    }
    
    setShowResults(true);
    onUpdateScore(75);
    onUpdateProgress({
      calculatorData: {
        inputMode,
        cigarettesPerDay: actualCigarettesPerDay,
        pricePerUnit,
        dailyCost: dailyCostInReais,
        monthlyCost,
        yearlyCost,
        monthlyCigarettes,
        yearlyCigarettes
      }
    });
  };

  return (
    <StepWrapper 
      title="💰 Calculadora de Impacto"
      subtitle="Descubra quanto você realmente gasta e o que está perdendo"
      onBack={onBack}
    >
      <div className="space-y-6">
        {!showResults ? (
          <>
            {/* Toggle Mode */}
            <div className="premium-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Como prefere calcular?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setInputMode('cigarettes')}
                  className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                    inputMode === 'cigarettes'
                      ? 'bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary text-primary'
                      : 'bg-card border border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  <Cigarette className="w-6 h-6 mx-auto mb-2" />
                  Por Cigarro
                </button>
                <button
                  onClick={() => setInputMode('packs')}
                  className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                    inputMode === 'packs'
                      ? 'bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary text-primary'
                      : 'bg-card border border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  <Package className="w-6 h-6 mx-auto mb-2" />
                  Por Maço
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="stat-card">
              <label className="block text-foreground font-semibold mb-4 flex items-center gap-2">
                {inputMode === 'cigarettes' ? (
                  <>
                    <Cigarette className="w-5 h-5 text-smoking" />
                    Quantos cigarros por dia?
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5 text-smoking" />
                    Quantos maços por dia?
                  </>
                )}
              </label>
              
              <input
                type="range"
                min={inputMode === 'cigarettes' ? 1 : 0.5}
                max={inputMode === 'cigarettes' ? 100 : 5}
                step={inputMode === 'cigarettes' ? 1 : 0.5}
                value={inputMode === 'cigarettes' ? cigarettesPerDay : packsPerDay}
                onChange={(e) => {
                  if (inputMode === 'cigarettes') {
                    setCigarettesPerDay(Number(e.target.value));
                  } else {
                    setPacksPerDay(Number(e.target.value));
                  }
                }}
                className="w-full mb-4"
              />
              
              <div className="text-center">
                <div className="text-4xl font-black mb-2" style={{
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {inputMode === 'cigarettes' ? cigarettesPerDay : packsPerDay}
                </div>
                <p className="text-sm text-muted-foreground">
                  {inputMode === 'cigarettes' 
                    ? `≈ ${(cigarettesPerDay / CIGARETTES_PER_PACK).toFixed(1)} maços`
                    : `= ${packsPerDay * CIGARETTES_PER_PACK} cigarros`
                  }
                </p>
              </div>
            </div>

            {/* Price Selector */}
            <div className="stat-card">
              <label className="block text-foreground font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gold" />
                Preço {inputMode === 'cigarettes' ? 'por maço' : 'por maço'} (R$)
              </label>
              
              <input
                type="range"
                min={0}
                max={30}
                step={0.5}
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full mb-4"
              />
              
              <div className="text-center">
                <div className="text-4xl font-black mb-2" style={{
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  R$ {pricePerUnit.toFixed(2)}
                </div>
                {inputMode === 'cigarettes' && pricePerUnit > 0 && (
                  <p className="text-sm text-muted-foreground">
                    ≈ R$ {(pricePerUnit / CIGARETTES_PER_PACK).toFixed(2)} por cigarro
                  </p>
                )}
              </div>
            </div>

            {/* Preview */}
            {pricePerUnit > 0 && (
              <div className="premium-card p-6 bg-gradient-to-br from-smoking/10 to-smoking/5 border-smoking/20 animate-fade-up">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-smoking" />
                  Prévia do Impacto
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-background/50 rounded-xl">
                    <div className="text-2xl font-bold text-smoking">R$ {monthlyCost.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground">Por mês</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-xl">
                    <div className="text-2xl font-bold text-smoking">R$ {yearlyCost.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground">Por ano</div>
                  </div>
                </div>
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={pricePerUnit === 0}
              className="w-full btn-premium text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="w-6 h-6" />
              Ver Impacto Total
              <Zap className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            {/* Results - Cigarette Count */}
            <div className="premium-card p-6 bg-gradient-to-br from-smoking/20 to-smoking/10 border-smoking/30">
              <h3 className="text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                <Cigarette className="w-6 h-6 text-smoking" />
                <span style={{
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Você fuma por mês
                </span>
              </h3>
              <div className="text-center">
                <div className="text-6xl font-black mb-2 animate-bounce-in" style={{
                  background: 'var(--gradient-gold)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {monthlyCigarettes.toLocaleString('pt-BR')}
                </div>
                <p className="text-lg text-muted-foreground">
                  cigarros = {(monthlyCigarettes / CIGARETTES_PER_PACK).toFixed(0)} maços
                </p>
                <p className="text-sm text-smoking-light mt-2">
                  Por ano: {yearlyCigarettes.toLocaleString('pt-BR')} cigarros
                </p>
              </div>
            </div>

            {/* Financial Impact */}
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card text-center">
                <DollarSign className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-gold mb-1">
                  R$ {monthlyCost.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Gasto Mensal</div>
              </div>
              
              <div className="stat-card text-center">
                <TrendingUp className="w-8 h-8 text-smoking mx-auto mb-2" />
                <div className="text-2xl font-bold text-smoking mb-1">
                  R$ {yearlyCost.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Gasto Anual</div>
              </div>
              
              <div className="stat-card text-center">
                <Banknote className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-warning mb-1">
                  R$ {fiveYearCost.toFixed(0)}
                </div>
                <div className="text-xs text-muted-foreground">Em 5 anos</div>
              </div>
              
              <div className="stat-card text-center bg-gradient-to-br from-smoking/20 to-smoking/10 border-smoking/30">
                <AlertCircle className="w-8 h-8 text-smoking mx-auto mb-2" />
                <div className="text-2xl font-bold text-smoking mb-1">
                  R$ {tenYearCost.toFixed(0)}
                </div>
                <div className="text-xs text-muted-foreground">Em 10 anos</div>
              </div>
            </div>

            {/* Health Impacts - Non-obvious Statistics */}
            <div className="premium-card p-6">
              <h3 className="text-lg font-bold text-center mb-6 flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5 text-smoking" />
                <span className="text-smoking">Impactos que Você Não Sabia</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {healthImpacts.map((impact, idx) => {
                  const Icon = impact.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl border border-smoking/20 bg-smoking/5 animate-fade-up"
                      style={{animationDelay: `${idx * 0.1}s`}}
                    >
                      <Icon className="w-6 h-6 text-smoking mb-2" />
                      <div className="text-xl font-bold text-smoking mb-1">{impact.stat}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{impact.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Material Equivalences */}
            <div className="premium-card p-6 bg-gradient-to-br from-primary/10 to-success/10 border-primary/20">
              <h3 className="text-lg font-bold text-center mb-6 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  O Que Você Poderia Ter
                </span>
              </h3>
              <div className="space-y-3">
                {getEquivalences(yearlyCost).map((eq, idx) => {
                  const yearsNeeded = (eq.value / yearlyCost).toFixed(1);
                  return (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-primary/10 animate-slide-in"
                      style={{animationDelay: `${idx * 0.1}s`}}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{eq.icon}</span>
                        <div>
                          <div className="font-bold text-foreground">{eq.item}</div>
                          <div className="text-xs text-muted-foreground">R$ {eq.value.toLocaleString('pt-BR')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">{yearsNeeded} anos</div>
                        <div className="text-xs text-muted-foreground">economizando</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={onNext}
              className="w-full btn-premium text-lg flex items-center justify-center gap-3"
            >
              Continuar Jornada
              <Zap className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </StepWrapper>
  );
};

export default Step4Calculator;
