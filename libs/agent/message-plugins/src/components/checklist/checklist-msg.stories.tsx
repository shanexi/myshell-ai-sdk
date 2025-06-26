import type { Meta, StoryObj } from '@storybook/react';
import { CheckList, CheckListItem } from './checklist-msg';
import { Container } from 'inversify';
import { agentMessagePluginsModule } from '../../agent-message-plugins.module';
import { Provider as InversifyProvider } from 'inversify-react';

const container = new Container();
container.load(agentMessagePluginsModule);

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
        <CheckListItem id="abc1" status="checked" text="Create initial files" />
        <CheckListItem id="abc2" status="pending" text="Install dependencies" />
        <CheckListItem
          id="abc3"
          status="unchecked"
          text={`Update :x-checklist-code[app/page.tsx]{scheme="file://app/page.tsx"}`}
        />
      </>
    ),
  },
};
