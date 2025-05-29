import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Container } from 'inversify';

const container = new Container();

const meta: Meta<typeof Button> = {
  component: Button,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
  parameters: {},
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {},
};
