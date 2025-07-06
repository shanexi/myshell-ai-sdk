import {
  ChatInputDoc,
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
    content_blocks: z.array(
      z.object({
        type: z.literal('text'),
        content: z.object({
          text: z.string(),
        }),
      }),
    ),
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

export function mapToSendRequest(
  chatInputDoc: ChatInputDoc,
  uploads: UploadItem[],
  contextItems: ContextItem[],
): z.infer<typeof chat_message_schema> | undefined {
  if (isEmpty(chatInputDoc.flat()) && isEmpty(uploads)) {
    return undefined;
  }

  const content_blocks = chatInputDoc
    .flat()
    .map((block) => {
      if (block.type === 'text') {
        return {
          type: 'text',
          content: {
            text: block.text,
          },
        };
      }
      return undefined;
    })
    .filter(Boolean) as z.infer<
    typeof chat_message_schema
  >['args']['content_blocks'];

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
