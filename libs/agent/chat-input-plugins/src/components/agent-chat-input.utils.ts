import { ChatInputDoc } from '@myshell-run/common-ui';
import { chat_message_schema, UploadItem } from './agent-chat-input.model';
import { z } from 'zod';
import { isEmpty } from 'radash';

export function mapToSendRequest(
  chatInputDoc: ChatInputDoc,
  uploads: UploadItem[],
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

  const context = uploads
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

  const result: z.infer<typeof chat_message_schema> = {
    type: 'chat_message',
    args: {
      content_blocks,
      context,
    },
  };

  return result;
}
