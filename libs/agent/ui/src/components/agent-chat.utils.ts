import { text_schema } from '@myshell-run/agent-message-plugins';
import {
  ChatInputDoc,
  content_block_schema,
  ContentBlock,
  context_schema,
  ContextItem,
  UploadItem,
} from '@myshell-run/common-ui';
import { init } from '@paralleldrive/cuid2';
import { isEmpty } from 'radash';
import { z } from 'zod';

export const chat_message_schema = z.object({
  request_id: z.string().optional(),
  type: z.literal('chat_message'),
  args: z.object({
    context: z.array(context_schema),
    content_blocks: z.array(content_block_schema),
  }),
});

const createId = init({
  length: 32,
  fingerprint: 'myshell-is-aaaaawesome',
});

export function generateRequestId() {
  return createId();
}

/**
 * 将 edix content_blocks 转换成后端接受的格式
 * @deprecated 没有使用的地方了
 */
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
 * @deprecated 由于 cause 现阶段交给 plugin 各自处理 不再需要
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

export function chatInputDocToConentBlock(
  chatInputDoc: ChatInputDoc,
): Array<ContentBlock> {
  return chatInputDoc.reduce(
    (acc, cur, idx) => {
      const blocks = cur.map((block) => {
        if (block.type === 'text') {
          return {
            type: 'text',
            content: {
              text: block.text,
            },
          };
        } else {
          return {
            type: block.type,
            content: block.data,
          };
        }
      });
      acc = acc.concat(blocks);

      if (idx !== chatInputDoc.length - 1) {
        acc.push({
          type: 'text',
          content: {
            text: '\n',
          },
        });
      }
      return acc;
    },
    [] as Array<ContentBlock>,
  );
}

export function contentBlockToChatInputDoc(
  blocks: Array<ContentBlock>,
): ChatInputDoc {
  return blocks.reduce(
    (acc, cur) => {
      if (cur.type === 'text' && cur.content.text === '\n') {
        acc.push([]);
        return acc;
      }

      const lastLine = acc[acc.length - 1];
      if (cur.type === 'text') {
        lastLine.push({
          type: 'text',
          text: cur.content.text as string,
        });
      } else {
        lastLine.push({
          type: cur.type as 'context',
          data: cur.content as {
            readonly content: string;
            readonly type: string;
          },
        });
      }
      return acc;
    },
    [[]] as ChatInputDoc,
  );
}

/**
 * sent message 映射
 */
export function mapToSendRequest(
  chatInputDoc: ChatInputDoc,
  uploads: UploadItem[],
  contextItems: ContextItem[],
): z.infer<typeof chat_message_schema> | undefined {
  if (isEmpty(chatInputDoc.flat()) && isEmpty(uploads)) {
    return undefined;
  }

  const content_blocks = chatInputDocToConentBlock(chatInputDoc);

  let context = uploads
    .map((upload) => {
      if (
        upload.fileKind === 'image' &&
        upload.response?.body?.data?.file_path
      ) {
        return {
          type: 'image',
          content: {
            name: upload.name,
            url: upload.response.body.data.file_path,
          },
        };
      }
      return undefined;
    })
    .filter(Boolean) as z.infer<typeof chat_message_schema>['args']['context'];
  context = context.concat(contextItems);

  const result: z.infer<typeof chat_message_schema> = {
    type: 'chat_message',
    request_id: generateRequestId(),
    args: {
      content_blocks,
      context,
    },
  };

  return result;
}
