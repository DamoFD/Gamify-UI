import { useEffect, useState } from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  level?: number;
  percent?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ animated = false, src, alt, level, percent, className, color = '#4ade80', ...props }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);

    // On mount, trigger the animation from 0 to the target percentage
    useEffect(() => {
      if (!percent) return;
      if (!animated) {
        setAnimatedPercent(percent);
        return;
      }
      const targetPercent = Math.max(0, Math.min(100, percent));
      let currentPercent = 0;
      const increment = targetPercent / 100; // Increase by a small fraction to smooth over 1 second

      const interval = setInterval(() => {
        currentPercent += increment;
        if (currentPercent >= targetPercent) {
          setAnimatedPercent(targetPercent);
          clearInterval(interval);
        } else {
          setAnimatedPercent(currentPercent);
        }
      }, 8); // 60 frames per second (~16ms per frame)

      return () => clearInterval(interval);
    }, [percent]);

    // Calculate the degree for the conic gradient (360 * percent / 100)
    const degree = (animatedPercent / 100) * 360;

  if (!percent) {
    return (
      <div className={`rounded-full size-24 p-2 flex items-center justify-center ${className}`} {...props}>
        <img className="rounded-full w-full h-full object-cover" src={src} alt={alt} />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-full size-32 p-2 flex items-center justify-center ${className}`} {...props}
      style={{
        background: `conic-gradient(${color} ${degree}deg, #d1d5db ${degree}deg)`,
      }}
    >
      <div className={`${!percent && 'hidden'} rounded-full w-full h-full p-2 bg-white flex items-center justify-center`}>
        <img className="rounded-full w-full h-full object-cover" src={src} alt={alt} />
      </div>
      {level && <Level level={level} color={color} />}
    </div>
  );
}

export default Avatar;

interface LevelProps {
  level: number;
  color: string;
}

const Level: React.FC<LevelProps> = ({ level, color }) => {
  return (
    <div className="bg-white absolute bottom-[5%] right-[5%] p-1 rounded-full flex items-center justify-center size-10">
      <div
        className="text-white p-1 rounded-full flex items-center justify-center w-full h-full"
        style={{
          background: color,
        }}
      >
        {level}
      </div>
    </div>
  );
}
