import type { Meta, StoryObj } from '@storybook/react';
import { ReplyMsgLegacy } from './reply-msg-legacy';

const meta: Meta<typeof ReplyMsgLegacy> = {
  component: ReplyMsgLegacy,
};
export default meta;

export const Reply: StoryObj<typeof ReplyMsgLegacy> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14522-121105&m=dev',
    },
  },
  args: {
    key: '2',
    text: `
你好！我正在为你审查 libs/ui 目录中的 TypeScript 文件，检查是否存在安全漏洞。我已经看到了目录结构，主要的代码应该在 src 目录中。让我继续查看 src 目录的内容。

~~~js
console.log('It works!')
~~~
`,
    user: 'other',
  },
};
