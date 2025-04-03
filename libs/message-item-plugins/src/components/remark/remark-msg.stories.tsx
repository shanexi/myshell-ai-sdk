import { InversifyProvider, RemarkMsg } from '@myshell-run/ui-primitives';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '../../message-item-plugins.module';

const container = new Container();
container.load(messageItemPluginsModule);

const meta: Meta<typeof RemarkMsg> = {
  component: RemarkMsg,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Reply: StoryObj<typeof RemarkMsg> = {
  parameters: {},
  args: {
    text: `:::main{#readme}

Lorem:br
ipsum.

::hr

A :i[lovely]{.text-red-500} language know as :abbr[HTML]{title="HyperText Markup Language"}.

::button[🥰 generate]{#msg-id-generate.btn.btn-blue}

:::
::interactive-component
`,
  },
};

export const Loading: StoryObj<typeof RemarkMsg> = {
  parameters: {},
  args: {
    text: `
::x-loading[AI is generating]
    `,
  },
};
