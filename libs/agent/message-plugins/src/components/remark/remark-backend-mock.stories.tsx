import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { agentMessagePluginsModule } from '../../agent-message-plugins.module';
import { RemarkStory } from './remark-msg-story-components';
import {
  msg2,
  msg4,
  msg6,
  msg10,
  msg11,
} from '../__storybook_data__/backend_mock_message';
import {
  content_blocks_schema,
  content_blocks_to_mdc,
} from './content-blocks-to-mdc';
const container = new Container();
container.load(agentMessagePluginsModule);

const meta: Meta<typeof RemarkStory> = {
  component: RemarkStory,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};

export default meta;

export const Msg2: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: content_blocks_to_mdc(content_blocks_schema.parse(msg2)),
  },
};

export const Msg4: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: content_blocks_to_mdc(content_blocks_schema.parse(msg4)),
  },
};

export const Msg6: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: content_blocks_to_mdc(content_blocks_schema.parse(msg6)),
  },
};

export const Msg10: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: content_blocks_to_mdc(content_blocks_schema.parse(msg10)),
  },
};

export const Msg11: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: content_blocks_to_mdc(content_blocks_schema.parse(msg11)),
  },
};
