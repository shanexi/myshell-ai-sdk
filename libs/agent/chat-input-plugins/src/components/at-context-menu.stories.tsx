import type { Meta, StoryObj } from '@storybook/react';
import { Provider as InversifyProvider } from 'inversify-react';
import { MentionDropdown, users } from './at-context-menu';
import { container } from './stories.utils';

const meta: Meta<typeof MentionDropdown> = {
  component: MentionDropdown,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof MentionDropdown> = {
  args: {
    users: users,
  },
};
