import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMessagePluginsModule } from '../../agent-message-plugins.module';
import { RemarkSimpleLogViewer } from './remark-simple-log-viewer';

const container = new Container();
container.load(agentMessagePluginsModule);

const meta: Meta<typeof RemarkSimpleLogViewer> = {
  component: RemarkSimpleLogViewer,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};

export default meta;

export const Primary: StoryObj<typeof RemarkSimpleLogViewer> = {
  parameters: {},
  args: {},
};
