import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

interface StepWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const StepWrapper = ({ children, title, subtitle, className = '', onBack, showBackButton = true }: StepWrapperProps) => {
  return (
    <div className={`min-h-screen bg-background relative overflow-hidden ${className}`}>
      {/* Status Bar - iOS Style */}
      <div className="flex justify-between items-center text-xs text-foreground/70 px-6 py-2">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-foreground/30 rounded-full"></div>
          </div>
          <div className="ml-1 text-xs">📶 📶 🔋</div>
        </div>
      </div>

      {/* Back Button - Premium iOS Style */}
      {showBackButton && onBack && (
        <div className="absolute top-16 left-6 z-20 animate-fade-up">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 backdrop-blur-xl border border-white/10 text-foreground hover:bg-card/70 hover:border-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
        </div>
      )}

      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-dream/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
              <span style={{ 
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {title}
              </span>
            </h1>
            {subtitle && (
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
                {subtitle}
              </p>
            )}
            
            {/* Premium Decorative Elements */}
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--gradient-primary)' }}></div>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--gradient-gold)', animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--gradient-primary)', animationDelay: '0.6s' }}></div>
            </div>
          </div>

          {/* Premium Content Container */}
          <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};