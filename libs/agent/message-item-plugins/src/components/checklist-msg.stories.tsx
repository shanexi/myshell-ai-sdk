import type { Meta, StoryObj } from '@storybook/react';
import { CheckList, CheckListItem } from './checklist-msg';
import { Container } from 'inversify';
import { agentMsgItemPluginsModule } from '../agent-msg-item-plugins.module';
import { InversifyProvider } from '@myshell-run/common-ui';

const container = new Container();
container.load(agentMsgItemPluginsModule);

const meta: Meta<typeof CheckList> = {
  component: CheckList,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof CheckList> = {
  args: {
    title: 'Design interactive landing pages.',
    children: (
      <>
        <CheckListItem
          id="abc1"
          status="checked"
          title="Create initial files"
        />
        <CheckListItem
          id="abc2"
          status="pending"
          title="Install dependencies"
        />
        <CheckListItem
          id="abc3"
          status="unchecked"
          title="Update `app/page.tsx`"
        />
      </>
    ),
  },
};
