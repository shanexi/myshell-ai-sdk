import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Mic, MicWave } from './mic';

const meta = {
  component: Mic,
  title: 'VoiceWave',
} satisfies Meta<typeof Mic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MicWave />,
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
