import { useState, useEffect } from 'react';
import { X, Trophy, Zap, Target, Gift } from 'lucide-react';

export type NotificationType = 'xp' | 'badge' | 'challenge' | 'reward' | 'streak';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: React.ReactNode;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const notificationIcons = {
  xp: <Zap className="w-5 h-5" />,
  badge: <Trophy className="w-5 h-5" />,
  challenge: <Target className="w-5 h-5" />,
  reward: <Gift className="w-5 h-5" />,
  streak: <Zap className="w-5 h-5" />
};

const notificationStyles = {
  xp: 'from-primary to-dream border-primary/30',
  badge: 'from-gold to-warning border-gold/30',
  challenge: 'from-warning to-gold border-warning/30',
  reward: 'from-success to-success-light border-success/30',
  streak: 'from-dream to-primary border-dream/30'
};

export const NotificationSystem = ({ notifications, onDismiss }: NotificationSystemProps) => {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

interface NotificationCardProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

const NotificationCard = ({ notification, onDismiss }: NotificationCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (notification.duration) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, notification.duration);
      
      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(notification.id);
    }, 300);
  };

  return (
    <div
      className={`
        premium-card p-4 bg-gradient-to-r ${notificationStyles[notification.type]}
        transform transition-all duration-500 cursor-pointer group
        ${isVisible ? 'notification-slide' : 'translate-x-full opacity-0'}
        ${isExiting ? 'notification-exit' : ''}
        hover:scale-105 hover:shadow-[var(--shadow-glow)]
      `}
      onClick={() => notification.action?.onClick()}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg">
          {notification.icon || notificationIcons[notification.type]}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-white mb-1">
            {notification.title}
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            {notification.message}
          </p>
          
          {notification.action && (
            <button className="mt-2 text-xs font-semibold text-white/90 hover:text-white transition-colors">
              {notification.action.label} →
            </button>
          )}
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X className="w-4 h-4 text-white/60 hover:text-white" />
        </button>
      </div>
      
      {/* Progress bar for timed notifications */}
      {notification.duration && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-lg overflow-hidden">
          <div 
            className="h-full bg-white/30 rounded-b-lg origin-left"
            style={{
              animation: `shrink ${notification.duration}ms linear`
            }}
          />
        </div>
      )}
    </div>
  );
};

// Hook para gerenciar notificações
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000
    };
    
    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Notificações predefinidas para gamificação
  const showXPGain = (points: number) => {
    addNotification({
      type: 'xp',
      title: `+${points} XP!`,
      message: 'Continue assim! Cada passo te aproxima do seu sonho.',
      duration: 3000
    });
  };

  const showBadgeUnlocked = (badgeName: string) => {
    addNotification({
      type: 'badge',
      title: 'Badge Conquistado!',
      message: badgeName,
      duration: 4000
    });
  };

  const showChallenge = (challengeName: string, reward: string) => {
    addNotification({
      type: 'challenge',
      title: 'Novo Desafio!',
      message: `${challengeName} - Recompensa: ${reward}`,
      duration: 6000,
      action: {
        label: 'Aceitar',
        onClick: () => console.log('Challenge accepted')
      }
    });
  };

  const showStreak = (days: number) => {
    addNotification({
      type: 'streak',
      title: `${days} dias de sequência!`,
      message: 'Você está no fogo! Continue mantendo o foco.',
      duration: 4000
    });
  };

  const showMilestone = (milestone: string) => {
    addNotification({
      type: 'reward',
      title: 'Marco Atingido!',
      message: milestone,
      duration: 5000
    });
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
    showXPGain,
    showBadgeUnlocked,
    showChallenge,
    showStreak,
    showMilestone
  };
};

// CSS adicional para animação da barra de progresso
const style = document.createElement('style');
style.textContent = `
  @keyframes shrink {
    from {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
  }
`;
document.head.appendChild(style);