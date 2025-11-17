import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? 'hsl(280, 100%, 70%)' : 'hsl(45, 100%, 65%)'
    }));

    setParticles(initialParticles);

    // Animation loop
    const animate = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;

        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth) {
          particle.speedX *= -1;
          newX = particle.x + particle.speedX;
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          particle.speedY *= -1;
          newY = particle.y + particle.speedY;
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.3 + 0.2
        };
      }));
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transition: 'opacity 0.3s ease'
          }}
        />
      ))}
    </div>
  );
};