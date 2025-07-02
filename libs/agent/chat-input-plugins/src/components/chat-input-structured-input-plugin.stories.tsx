import type { Meta, StoryObj } from '@storybook/react';
import { Provider as InversifyProvider } from 'inversify-react';
import { ChatInputStructuredInputPlugin } from './chat-input-structured-input-plugin';
import { container } from './stories.utils';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof ChatInputStructuredInputPlugin> = {
  component: ChatInputStructuredInputPlugin,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatInputStructuredInputPlugin> = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the contenteditable div by CSS selector
    const input = canvasElement.querySelector(
      '[contenteditable="true"]',
    ) as HTMLElement;

    // Clear any existing content
    await userEvent.click(input);
    await userEvent.clear(input);

    // 1. Input "abc"
    await userEvent.type(input, 'abc');
    await new Promise((r) => setTimeout(r, 500));

    // 2. Shift + Enter for new line
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}');
    await new Promise((r) => setTimeout(r, 500));

    // 3. Input "def"
    await userEvent.type(input, 'def');
    await new Promise((r) => setTimeout(r, 500));

    // Check the input content - should contain both lines
    // The exact format might vary (could be "abc\ndef" or have <br> tags)
    const textContent = input.textContent || '';
    const innerHTML = input.innerHTML;

    console.log('Text content:', textContent);
    console.log('Inner HTML:', innerHTML);

    // Check that we have both "abc" and "def" in the content
    expect(textContent).toContain('abc');
    expect(textContent).toContain('def');

    // Verify there's a line break between them (could be \n or <br>)
    const hasLineBreak =
      innerHTML.includes('<br>') || textContent.includes('\n');
    expect(hasLineBreak).toBe(true);
  },
};
