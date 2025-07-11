import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Mic } from './mic';

const meta = {
  component: Mic,
  title: 'VoiceWave',
} satisfies Meta<typeof Mic>;

export default meta;
type Story = StoryObj<typeof meta>;

function SimulatedVoiceWave() {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 使用正弦波模拟音量变化，产生平滑的周期性变化
      const time = Date.now() / 1000; // 转换为秒
      const newVolume = (Math.sin(time * 2) + 1) / 2; // 将 -1~1 转换为 0~1
      setVolume(newVolume);
    }, 50); // 每 50ms 更新一次

    return () => clearInterval(interval);
  }, []);

  return <Mic volume={volume} />;
}

export const Default: Story = {
  render: () => <SimulatedVoiceWave />,
  args: {
    volume: 0, // 这个值会被 SimulatedVoiceWave 组件内部的状态覆盖
  },
};

// 展示最大音量效果
export const MaxVolume: Story = {
  args: {
    volume: 1,
  },
};

// 展示最小音量效果
export const MinVolume: Story = {
  args: {
    volume: 0,
  },
};
