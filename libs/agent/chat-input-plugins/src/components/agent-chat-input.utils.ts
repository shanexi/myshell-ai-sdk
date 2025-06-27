import { ChatInputDoc } from '@myshell-run/common-ui';
import {
  chat_message_schema,
  ContextItem,
  UploadItem,
} from './agent-chat-input.model';
import { z } from 'zod';
import { isEmpty } from 'radash';
import { init } from '@paralleldrive/cuid2';

const createId = init({
  length: 32,
  fingerprint: 'myshell-is-aaaaawesome',
});

export function generateRequestId() {
  return createId();
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

// AI 生成
export function fuzzyMatch(
  text: string,
  search: string,
): { highlighted: Array<{ char: string; isMatch: boolean }>; score: number } {
  const searchLower = search.toLowerCase();
  const textLower = text.toLowerCase();

  let searchIndex = 0;
  let score = 0;
  const highlighted: Array<{ char: string; isMatch: boolean }> = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charLower = textLower[i];

    if (
      searchIndex < searchLower.length &&
      charLower === searchLower[searchIndex]
    ) {
      highlighted.push({ char, isMatch: true });
      searchIndex++;
      // Give higher score for consecutive matches
      score += searchIndex === 1 ? 10 : 5;
      // Bonus for matches at word boundaries
      if (i === 0 || text[i - 1] === ' ' || text[i - 1] === '.') {
        score += 5;
      }
    } else {
      highlighted.push({ char, isMatch: false });
    }
  }

  // Only return matches if all search characters were found
  if (searchIndex === searchLower.length) {
    // Bonus for shorter strings (better matches)
    score += Math.max(0, 50 - text.length);
    return { highlighted, score };
  }

  return { highlighted: [], score: 0 };
}
