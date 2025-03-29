import { zValidator } from '@hono/zod-validator';
import { streamSSE } from 'hono/streaming';
import { z } from 'zod';
import { createRoute } from '../../create-route';
import { requireAuth } from '../../middlewares/require-auth';
// FIXME: langchain 会导致 vite hang
// import { ChatOpenAI } from '@langchain/openai';
import OpenAI from 'openai';
import { ChatService } from '@myshell-run/biz-service';

export const POST = createRoute(
  requireAuth,
  zValidator(
    'json',
    z.object({
      msgId: z.string(),
      replyMsgId: z.string(),
      prompt: z.string(),
      botId: z.number(),
    }),
  ),
  async (c) => {
    const { msgId, replyMsgId, prompt, botId } = c.req.valid('json');
    const container = c.get('container');
    const chatService = container.get(ChatService);
    const chunks = chatService.chat(botId, prompt, msgId, replyMsgId);

    return streamSSE(c, async (stream) => {
      for await (const chunk of chunks) {
        if (chunk) {
          await stream.writeSSE({
            data: chunk,
          });
        }
      }
      await stream.writeSSE({
        data: '',
        event: 'inserted',
      });
    });
  },
);
