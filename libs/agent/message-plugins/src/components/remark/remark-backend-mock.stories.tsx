/*
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { agentMessagePluginsModule } from '../../agent-message-plugins.module';
import {
  msg10,
  msg11,
  msg2,
  msg4,
  msg6,
} from '../__storybook_data__/backend_mock_message';
import { ContentBlockableManager } from './content-block-to-mdc-transform-manager';
import { content_blocks_schema } from './content-blocks-to-mdc';
import { RemarkStory } from './remark-msg-story-components';

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
    text: container
      .get(ContentBlockableManager)
      .transform(content_blocks_schema.parse(msg2)),
  },
};

export const Msg4: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: container
      .get(ContentBlockableManager)
      .transform(content_blocks_schema.parse(msg4)),
  },
};

export const Msg6: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: container
      .get(ContentBlockableManager)
      .transform(content_blocks_schema.parse(msg6)),
  },
};

export const Msg10: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: container
      .get(ContentBlockableManager)
      .transform(content_blocks_schema.parse(msg10)),
  },
};

export const Msg11: StoryObj<typeof RemarkStory> = {
  parameters: {},
  args: {
    text: container
      .get(ContentBlockableManager)
      .transform(content_blocks_schema.parse(msg11)),
  },
};
*/
