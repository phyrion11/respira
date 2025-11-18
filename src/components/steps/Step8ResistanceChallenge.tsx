import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Target, Zap, Clock, Award } from 'lucide-react';
import { StepWrapper } from '../StepWrapper';

interface Step8ResistanceChallengeProps {
  onNext: () => void;
  onBack?: () => void;
  onUpdateScore: (points: number) => void;
}

const Step8ResistanceChallenge: React.FC<Step8ResistanceChallengeProps> = ({ onNext, onBack, onUpdateScore }) => {
  const [currentPhase, setCurrentPhase] = useState<'instructions' | 'challenge' | 'completed'>('instructions');
  const [timeLeft, setTimeLeft] = useState(30);
  const [resistanceLevel, setResistanceLevel] = useState(0);
  const [points, setPoints] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showBonus, setShowBonus] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setCurrentPhase('completed');
            setShowBonus(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startChallenge = () => {
    setCurrentPhase('challenge');
    setIsActive(true);
    setTimeLeft(30);
  };

  const handleResistanceClick = () => {
    if (isActive) {
      const newLevel = Math.min(resistanceLevel + 1, 10);
      setResistanceLevel(newLevel);
      const earnedPoints = newLevel * 10;
      setPoints(earnedPoints);
    }
  };

  const skipChallenge = () => {
    setCurrentPhase('completed');
    onNext();
  };

  const completeAndCollect = () => {
    onUpdateScore(points + (showBonus ? 100 : 0));
    onNext();
  };

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-green-400';
    if (timeLeft <= 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (currentPhase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Desafio de Resistência</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Teste sua força de vontade! Clique no botão de resistência o máximo de vezes possível em 30 segundos.
                Cada clique representa sua determinação para vencer o vício.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-white/90">
                <Target className="w-5 h-5 text-purple-400" />
                <span>Meta: 50+ cliques para bônus máximo</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Cada clique = 10 pontos de resistência</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Tempo limite: 30 segundos</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={startChallenge}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>Iniciar Desafio</span>
              </button>
              <button
                onClick={skipChallenge}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 border border-white/30"
              >
                Pular Desafio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'challenge') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
            <div className={`text-6xl font-bold mb-4 ${getTimerColor()} transition-colors duration-300`}>
              {timeLeft}s
            </div>
            
            <div className="mb-8">
              <div className="text-2xl font-bold text-white mb-2">Nível de Resistência: {resistanceLevel}</div>
              <div className="text-xl text-purple-300">Pontos: {points}</div>
            </div>

            <button
              onClick={handleResistanceClick}
              disabled={!isActive}
              className="w-48 h-48 bg-gradient-to-br from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold text-2xl rounded-full transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 mx-auto mb-8 flex items-center justify-center"
            >
              <Shield className="w-16 h-16" />
            </button>

            <div className="w-full bg-white/20 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(resistanceLevel / 10) * 100}%` }}
              ></div>
            </div>

            <p className="text-white/80">Clique no escudo para aumentar sua resistência!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Award className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Desafio Concluído!</h2>
          <p className="text-white/80 text-lg mb-6">
            Você demonstrou uma resistência incrível! Sua força de vontade está se fortalecendo.
          </p>

          <div className="bg-white/20 rounded-2xl p-6 mb-8">
            <div className="text-2xl font-bold text-white mb-2">Nível Final: {resistanceLevel}</div>
            <div className="text-xl text-purple-300 mb-4">Pontos Ganhos: {points}</div>
            {showBonus && (
              <div className="text-lg text-green-400 font-semibold animate-pulse">
                🎉 Bônus de Conclusão: +100 pontos!
              </div>
            )}
          </div>

          <button
            onClick={completeAndCollect}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Award className="w-5 h-5" />
            <span>Concluir e Coletar Pontos</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step8ResistanceChallenge;