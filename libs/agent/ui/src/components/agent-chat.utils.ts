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

export function processBlockDirectiveNewLine(textList: string[]) {
  const text = textList.reduce((acc, cur) => {
    if (cur.startsWith('::')) {
      if (!acc.endsWith('\n')) {
        acc = acc + '\n';
      }
      if (!cur.endsWith('\n')) {
        cur = cur + '\n';
      }
      acc = acc + cur;
    } else {
      acc = acc + cur;
    }
    return acc;
  }, '');
  return text;
}

/**
 * @see https://github.com/myshell-ai/myshell-chat/issues/38
 */
export function mergeContentBlocksText(
  blocks: Array<{ type: string; text: string }>,
) {
  if (blocks.length === 0) return [];

  return blocks.slice(1).reduce(
    (acc, cur) => {
      const last = acc[acc.length - 1];
      // If adjacent blocks have the same type, merge them
      if (last && last.type === cur.type) {
        last.text = last.text + cur.text;
      } else {
        acc.push(cur);
      }
      return acc;
    },
    [blocks[0]],
  );
}
