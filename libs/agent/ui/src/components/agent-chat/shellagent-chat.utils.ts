import { ChatInputDoc } from '@myshell-run/common-ui';

export function f2b_content_blocks(f: ChatInputDoc) {
  return f.map((row) =>
    row.map((block) => {
      if (block.type === 'context') {
        return {
          type: 'context',
          content: block.data,
        };
      } else if (block.type === 'text') {
        return {
          type: 'text',
          content: {
            text: block.text,
          },
        };
      }
      return block;
    }),
  );
}
