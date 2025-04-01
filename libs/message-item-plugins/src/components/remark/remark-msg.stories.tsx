import type { Meta, StoryObj } from '@storybook/react';
import { RemarkMsg } from './remark-msg';

const meta: Meta<typeof RemarkMsg> = {
  component: RemarkMsg,
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
