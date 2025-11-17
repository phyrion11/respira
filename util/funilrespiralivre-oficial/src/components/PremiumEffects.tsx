import { useEffect, useState } from 'react';
import { Sparkles, Star, Zap, Trophy } from 'lucide-react';

interface ParticleProps {
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
}

export const ParticleEffect = ({ x, y, color, size, duration }: ParticleProps) => {
  const [particles] = useState(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 45) * (Math.PI / 180),
      velocity: Math.random() * 100 + 50,
      life: 1
    }))
  );

  return (
    <div 
      className="fixed pointer-events-none z-[200]"
      style={{ left: x, top: y }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            animation: `particleMove ${duration}ms ease-out forwards`,
            '--angle': `${particle.angle}rad`,
            '--velocity': `${particle.velocity}px`,
            transform: `translate(-50%, -50%)`
          } as any}
        />
      ))}
    </div>
  );
};

interface FloatingIconProps {
  icon: React.ReactNode;
  x: number;
  y: number;
  duration?: number;
  color?: string;
}

export const FloatingIcon = ({ icon, x, y, duration = 2000, color = '#FFD700' }: FloatingIconProps) => {
  return (
    <div
      className="fixed pointer-events-none z-[200] text-2xl"
      style={{
        left: x,
        top: y,
        color: color,
        animation: `floatUp ${duration}ms ease-out forwards`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {icon}
    </div>
  );
};

export const PremiumConfetti = ({ duration = 3000 }: { duration?: number }) => {
  const [confetti] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1000,
      duration: 2000 + Math.random() * 1000,
      color: ['#FFD700', '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)]
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      // Cleanup confetti after duration
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animation: `confettiFall ${piece.duration}ms linear ${piece.delay}ms forwards`
          }}
        />
      ))}
    </div>
  );
};

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'gold' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const PremiumButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = ''
}: PremiumButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  const variants = {
    primary: 'from-primary to-dream border-primary/30',
    gold: 'from-gold to-warning border-gold/30',
    success: 'from-success to-success-light border-success/30',
    danger: 'from-smoking to-smoking-dark border-smoking/30'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);

    const newRipple = {
      id: Date.now(),
      x: x - size / 2,
      y: y - size / 2,
      size
    };

    setRipples(prev => [...prev, newRipple]);
    setIsPressed(true);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    setTimeout(() => setIsPressed(false), 150);

    onClick?.();
  };

  return (
    <button
      className={`
        relative overflow-hidden button-premium 
        bg-gradient-to-r ${variants[variant]} ${sizes[size]}
        text-white font-bold rounded-xl border
        shadow-[var(--shadow-premium)] transition-[var(--transition-premium)]
        hover:scale-105 hover:shadow-[var(--shadow-glow)]
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100 disabled:hover:shadow-[var(--shadow-premium)]
        ${isPressed ? 'scale-95' : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%]" />
      
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation: 'ripple 0.6s ease-out'
          }}
        />
      ))}
      
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const LevelUpEffect = ({ level, onComplete }: { level: number; onComplete?: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
      <PremiumConfetti />
      
      <div className="premium-card p-12 text-center celebrate-premium">
        <div className="text-8xl mb-6">
          <Trophy className="w-24 h-24 mx-auto text-gold animate-pulse" />
        </div>
        
        <h2 className="text-4xl font-bold text-gradient mb-4">
          NÍVEL {level}!
        </h2>
        
        <p className="text-xl text-muted-foreground mb-6">
          Você desbloqueou novos recursos!
        </p>
        
        <div className="flex justify-center gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="w-4 h-4 bg-gold rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const StreakEffect = ({ 
  streak, 
  onComplete,
  x,
  y 
}: { 
  streak: number; 
  onComplete?: () => void;
  x?: number;
  y?: number;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed pointer-events-none z-[200]"
      style={{ 
        left: x || '50%', 
        top: y || '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="text-center bounce-in-premium">
        <div className="text-6xl mb-2">🔥</div>
        <div className="bg-gradient-to-r from-warning to-gold text-warning-foreground px-6 py-3 rounded-full font-bold text-lg shadow-[var(--shadow-gold)]">
          {streak} dias seguidos!
        </div>
      </div>
    </div>
  );
};

// Adicionar CSS para as animações específicas
const premiumStyles = document.createElement('style');
premiumStyles.textContent = `
  @keyframes particleMove {
    0% {
      transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0);
      opacity: 1;
      scale: 1;
    }
    100% {
      transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--velocity));
      opacity: 0;
      scale: 0;
    }
  }

  @keyframes floatUp {
    0% {
      transform: translate(-50%, -50%) translateY(0);
      opacity: 1;
      scale: 1;
    }
    100% {
      transform: translate(-50%, -50%) translateY(-100px);
      opacity: 0;
      scale: 1.5;
    }
  }

  @keyframes confettiFall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0.6;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(premiumStyles);