import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface XPAnimationProps {
  points: number;
  onComplete?: () => void;
}

export const XPAnimation = ({ points, onComplete }: XPAnimationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="celebrate">
        <div className="xp-badge text-xl pulse-glow">
          <Sparkles className="w-5 h-5 inline-block mr-2" />
          +{points} XP
        </div>
      </div>
    </div>
  );
};

interface BadgeAnimationProps {
  badge: string;
  onComplete?: () => void;
}

export const BadgeAnimation = ({ badge, onComplete }: BadgeAnimationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="celebrate bg-white game-card p-6 text-center">
        <div className="text-4xl mb-2">🏆</div>
        <div className="text-lg font-bold text-primary mb-1">Badge Conquistado!</div>
        <div className="text-sm text-muted-foreground">{badge}</div>
      </div>
    </div>
  );
};