import { zValidator } from '@hono/zod-validator';
import { streamSSE } from 'hono/streaming';
import { z } from 'zod';
import { createRoute } from '../../create-route';
import { requireAuth } from '../../middlewares/require-auth';
// FIXME: langchain 会导致 vite hang
// import { ChatOpenAI } from '@langchain/openai';
import OpenAI from 'openai';

export default createRoute(
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
    const db = c.get('db');
    const auth = c.get('clerkAuth');
    if (!auth?.userId) {
      throw new Error('Unauthorized');
    }
    db.insertInto('message')
      .values({
        id: msgId,
        text: prompt,
        sessionId: `bot-${botId}`,
        senderId: `user-${auth.userId}`,
      })
      .executeTakeFirst();

    console.log('me message insert db', msgId);

    const client = new OpenAI({
      apiKey: c.env.OPENAI_KEY,
      baseURL: c.env.OPENAI_BASE_URL,
    });

    const chunks = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    const messages: string[] = [];

    const res = await streamSSE(c, async (stream) => {
      for await (const event of chunks) {
        const content = event.choices[0]?.delta?.content;
        if (content) {
          messages.push(content);
          await stream.writeSSE({
            data: content,
          });
        }
      }
      console.log('reply message done, insert db', replyMsgId);
      await db
        .insertInto('message')
        .values({
          id: replyMsgId,
          text: messages.join(''),
          sessionId: `bot-${botId}`,
          senderId: `bot-${botId}`,
        })
        .executeTakeFirst();
      console.log('reply message db inserted', replyMsgId);
      await stream.writeSSE({
        data: '',
        event: 'inserted',
      });
    });

    return res;
  },
);
