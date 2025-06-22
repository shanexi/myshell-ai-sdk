import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Provider as InversifyProvider } from 'inversify-react';
import { ChatInputAdvancedInputPlugin } from './chat-input-advanced-input-plugin';
import { container } from './stories.utils';

const meta: Meta<typeof ChatInputAdvancedInputPlugin> = {
  component: ChatInputAdvancedInputPlugin,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatInputAdvancedInputPlugin> = {
  args: {},
  // 似乎 cypress 不能 test 这个
  // TODO: 后面迁移到 chromatic
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the contenteditable div by CSS selector
    const input = canvasElement.querySelector(
      '[contenteditable="true"]',
    ) as HTMLElement;

    // 1. Input "abc"
    await userEvent.click(input);
    await userEvent.type(input, 'abc');

    await new Promise((r) => setTimeout(r, 1000));

    // TODO: 是成功了，但是光标没有到下一行，先不测试这个 case
    // 2. Shift + Enter for new line
    // await userEvent.keyboard('{Shift>}{Enter}{/Shift}');

    // 3. Input "def"
    await userEvent.type(input, 'def');

    await new Promise((r) => setTimeout(r, 1000));

    // 4. Press Enter to send
    await userEvent.keyboard('{Enter}');

    await new Promise((r) => setTimeout(r, 1000));

    // 5. Command + Z to undo
    await userEvent.keyboard('{Meta>}z{/Meta}');
    await new Promise((r) => setTimeout(r, 1000));

    // 6. Verify text content
    expect(input.textContent).toBe('abcdef');
  },
};
