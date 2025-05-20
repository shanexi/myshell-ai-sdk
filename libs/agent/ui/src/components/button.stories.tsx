import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { container } from './stories.utils';

const meta: Meta<typeof Button> = {
  component: Button,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YHfVjepmkzvSL4Yf1nD9KS/Shell-Agent?node-id=1408-77922&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {},
};
