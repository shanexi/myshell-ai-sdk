import type { Meta, StoryObj } from '@storybook/react';
import { CheckList, ChecklistItemUI } from './checklist-msg';

const meta: Meta<typeof CheckList> = {
  component: CheckList,
};
export default meta;

export const Primary: StoryObj<typeof CheckList> = {
  args: {
    title: 'Design interactive landing pages.',
    children: (
      <>
        <ChecklistItemUI status="checked" title="Create initial files" />
        <ChecklistItemUI status="pending" title="Install dependencies" />
        <ChecklistItemUI status="unchecked" title="Update `app/page.tsx`" />
      </>
    ),
  },
};
