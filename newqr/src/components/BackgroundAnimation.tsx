import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const DragonBallAura: React.FC = () => {
  const { webTheme } = useTheme();
  const opacity = webTheme === 'light' ? 0.1 : 0.3;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Energy aura waves */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{
            borderColor: 'var(--theme-primary)',
            opacity: opacity,
            left: '50%',
            top: '50%',
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            marginLeft: `${-100 - i * 50}px`,
            marginTop: `${-100 - i * 50}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [opacity, opacity * 0.3, opacity],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Floating energy orbs */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full bg-[var(--theme-primary)] blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: opacity * 2,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [opacity * 2, opacity * 0.8, opacity * 2],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const TitanSmoke: React.FC = () => {
  const { webTheme } = useTheme();
  const opacity = webTheme === 'light' ? 0.05 : 0.2;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Steam/smoke effects */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-radial from-[var(--theme-primary)] to-transparent blur-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            opacity: opacity,
          }}
          animate={{
            scale: [1, 1.5, 0.8],
            y: [0, -50, 0],
            opacity: [opacity, opacity * 0.25, opacity],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Falling debris */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`debris-${i}`}
          className="absolute w-1 h-1 bg-[var(--theme-accent)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            opacity: opacity * 3,
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const WaterBreathing: React.FC = () => {
  const { webTheme } = useTheme();
  const opacity = webTheme === 'light' ? 0.2 : 0.4;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Water ripples */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-[var(--theme-primary)] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '20px',
            height: '20px',
            opacity: opacity,
          }}
          animate={{
            scale: [0, 8],
            opacity: [opacity, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeOut',
          }}
        />
      ))}
      
      {/* Flowing water lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`flow-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent"
          style={{
            left: '0%',
            top: `${Math.random() * 100}%`,
            width: '100%',
            opacity: opacity * 1.25,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, opacity * 1.25, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const PirateWaves: React.FC = () => {
  const { webTheme } = useTheme();
  const opacity = webTheme === 'light' ? 0.1 : 0.2;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Ocean waves */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-32 bg-gradient-to-t from-[var(--theme-primary)] to-transparent"
          style={{
            bottom: `${i * 30}px`,
            opacity: opacity,
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Treasure sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-[var(--theme-accent)] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: opacity * 4,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, opacity * 4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export const BackgroundAnimation: React.FC = () => {
  const { currentTheme } = useTheme();

  const getAnimationComponent = () => {
    switch (currentTheme.name) {
      case 'dragon-ball':
        return <DragonBallAura />;
      case 'attack-titan':
        return <TitanSmoke />;
      case 'demon-slayer':
        return <WaterBreathing />;
      case 'one-piece':
        return <PirateWaves />;
      default:
        return <DragonBallAura />;
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--theme-background)' }}
      />
      {getAnimationComponent()}
    </div>
  );
};