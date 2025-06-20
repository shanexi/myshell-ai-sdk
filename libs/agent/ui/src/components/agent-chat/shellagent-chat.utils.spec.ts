import { ChatInputDoc } from '@myshell-run/common-ui';
import { f2b_content_blocks } from './shellagent-chat.utils';

it('patch to backend', () => {
  const f: ChatInputDoc = [
    [
      {
        type: 'context',
        data: {
          content: 'Bob Smith ',
        },
      },
      {
        type: 'text',
        text: ' 123',
      },
    ],
  ];
  const b = [
    [
      {
        type: 'context',
        content: {
          content: 'Bob Smith ',
        },
      },
      {
        type: 'text',
        content: {
          text: ' 123',
        },
      },
    ],
  ];

  const a = f2b_content_blocks(f);
  expect(a).toEqual(b);
});
