import type { Meta, StoryObj } from '@storybook/react';
import { Think } from './think';
import { Container } from 'inversify';
import { agentMessagePluginsModule } from '../agent-message-plugins.module';
import { Provider as InversifyProvider } from 'inversify-react';

const container = new Container();
container.load(agentMessagePluginsModule);

const meta: Meta<typeof Think> = {
  component: Think,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof Think> = {
  args: {
    id: 'abc',
    text: '\ud83d\udcdd {"id":"fc_685a97814c88819ba3c5ab579284fef40c6a39901c840833","type":"function_call","status":"completed","arguments":"{\\"command\\":[\\"bash\\",\\"-lc\\",\\"ls -R\\"]}","call_id":"call_r6SZeqznNiABZoWhYqf3SFDu","name":"shell"}',
  },
};
