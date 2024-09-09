import type { Meta, StoryObj } from '@storybook/react';
import { Chat } from './chat';
import { DisplayMessage, Message } from 'my_shell_react-build-new';
import { NextIntlClientProvider } from 'next-intl';

const meta: Meta<typeof Chat> = {
  component: Chat,
};
export default meta;

export const Primary: StoryObj<typeof Chat> = {
  args: {},
};
