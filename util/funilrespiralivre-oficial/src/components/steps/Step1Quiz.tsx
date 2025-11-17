import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepWrapper } from '@/components/StepWrapper';
import { XPAnimation, BadgeAnimation } from '@/components/XPAnimation';
import { quizQuestions, archetypeResults, socialProofStats } from '@/data/quiz';
import { UserProfile, UserArchetype } from '@/types/funnel';

interface Step1QuizProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
}

export const Step1Quiz = ({ userProfile, onUpdateProfile, onNext }: Step1QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [archetypeScores, setArchetypeScores] = useState<Record<UserArchetype, number>>({
    'tech-lover': 0,
    'adventurer': 0,
    'family-first': 0,
    'luxury-seeker': 0
  });

  const handleAnswer = (optionId: string) => {
    const question = quizQuestions[currentQuestion];
    const selectedOption = question.options.find(opt => opt.id === optionId);
    
    if (!selectedOption) return;

    // Update answers
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    // Update archetype scores
    const newScores = { ...archetypeScores };
    newScores[selectedOption.archetype] += selectedOption.points;
    setArchetypeScores(newScores);

    // Move to next question or show result
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        showQuizResult(newScores);
      }
    }, 500);
  };

  const showQuizResult = (scores: Record<UserArchetype, number>) => {
    // Determine winning archetype
    const winningArchetype = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as UserArchetype] > scores[b[0] as UserArchetype] ? a : b
    )[0] as UserArchetype;

    // Update profile
    onUpdateProfile({
      archetype: winningArchetype,
      xp: userProfile.xp + 100,
      badges: [...userProfile.badges, 'Sonhador Identificado']
    });

    setShowResult(true);
    setShowXP(true);
  };

  const handleContinue = () => {
    setShowBadge(true);
  };

  const handleBadgeComplete = () => {
    setShowBadge(false);
    onNext();
  };

  if (showResult && userProfile.archetype) {
    const result = archetypeResults[userProfile.archetype];
    
    return (
      <>
        {showXP && <XPAnimation points={100} onComplete={() => setShowXP(false)} />}
        {showBadge && <BadgeAnimation badge="Sonhador Identificado" onComplete={handleBadgeComplete} />}
        
        <StepWrapper
          title="Seu Perfil de Sonhador"
          subtitle="Descobrimos muito sobre você!"
        >
          <div className="premium-card p-8 text-center">
            <div className="text-8xl mb-6 float">{result.icon}</div>
            <h2 className="text-3xl font-bold text-gradient mb-3">{result.title}</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{result.description}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {result.traits.map((trait, index) => (
                <div 
                  key={index} 
                  className="glass-panel bg-success/20 text-success px-4 py-3 rounded-xl text-sm font-semibold border border-success/30 hover:scale-105 transition-transform"
                >
                  {trait}
                </div>
              ))}
            </div>

            <div className="glass-panel bg-primary/10 border border-primary/30 rounded-xl p-6 mb-8">
              <div className="text-sm text-muted-foreground mb-2">Estatística Social</div>
              <div className="text-xl font-bold text-primary">
                {socialProofStats[userProfile.archetype]}% dos usuários compartilham seu perfil
              </div>
              <div className="flex justify-center mt-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-primary/30 rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            <div className="button-premium w-full" onClick={handleContinue}>
              <span className="flex items-center justify-center gap-2">
                Continuar Jornada
                <ChevronRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </StepWrapper>
      </>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <StepWrapper
      title="Quiz do Sonhador"
      subtitle="Vamos descobrir que tipo de sonhador você é!"
    >
      <div className="premium-card p-8">
        {/* Enhanced Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-foreground">
              Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </span>
            <span className="streak-counter">
              {Math.round(progress)}% completo
            </span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
            <div 
              className="progress-bar-premium h-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Enhanced Question */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gradient mb-8 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className="w-full p-6 text-left premium-glow glass-panel
                          hover:border-primary/50 hover:bg-primary/5 transition-[var(--transition-premium)]
                          focus:outline-none focus:ring-2 focus:ring-primary/30
                          active:scale-[0.98] group interactive-element"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {option.text}
                  </span>
                  <div className="w-8 h-8 rounded-full border-2 border-primary/30 bg-primary/10
                                flex items-center justify-center group-hover:border-primary group-hover:bg-primary/20 transition-all">
                    {answers[question.id] === option.id && (
                      <Check className="w-5 h-5 text-primary animate-bounce-in-premium" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Social Proof */}
        <div className="glass-panel bg-gradient-to-r from-primary/10 to-dream/10 border border-primary/20 rounded-xl p-4 text-center">
          <div className="text-sm font-semibold text-primary mb-1">
            🔥 Mais de 12.847 sonhadores já descobriram seu perfil
          </div>
          <div className="text-xs text-muted-foreground">
            Junte-se à comunidade de pessoas transformando seus sonhos em realidade
          </div>
        </div>
      </div>
    </StepWrapper>
  );
};