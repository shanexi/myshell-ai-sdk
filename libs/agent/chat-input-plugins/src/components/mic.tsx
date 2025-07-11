import { motion, useAnimation } from 'motion/react';
import { useEffect, useState } from 'react';
import { Mic as MicIcon } from 'lucide-react';
import { cn } from '@myshell-run/common-ui';

export function Mic({ volume }: { volume: number }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: 1 + volume * 0.2,
      opacity: 0.8 - volume * 0.2, // 调整透明度范围，让背景色更明显
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    });
  }, [volume]);

  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <motion.div
        animate={controls}
        className={cn(
          'rounded-md-v2 bg-Cr-Bg-brand-subtle-v2',
          'absolute h-full w-full',
        )}
      />
      <div
        className={cn(
          'absolute',
          'flex items-center justify-center',
          'h-C-button-md-height-v2 w-C-button-md-min-width-v2',
          'rounded-md-v2 bg-Cr-Bg-brand-default-v2',
        )}
      >
        <MicIcon
          strokeWidth={1.5}
          size={22}
          className="text-Cr-Fg-brand-default-v2"
        />
      </div>
    </div>
  );
}

export function MicWave() {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      // 将频率从 2 调整到 4，使波动更快
      const newVolume = (Math.sin(time * 4) + 1) / 2;
      setVolume(newVolume);
    }, 30); // 将更新间隔从 50ms 减少到 30ms，使动画更流畅

    return () => clearInterval(interval);
  }, []);

  return <Mic volume={volume} />;
}
