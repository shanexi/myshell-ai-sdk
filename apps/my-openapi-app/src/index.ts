import { createOpenAI } from '@ai-sdk/openai';
import { swaggerUI } from '@hono/swagger-ui';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { generateObject } from 'ai';

type Env = {
  Bindings: CloudflareBindings;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '1212121',
    }),
});

const UserSchema = z
  .object({
    id: z.string().openapi({
      example: '123',
    }),
    name: z.string().openapi({
      example: 'John Doe',
    }),
    age: z.number().openapi({
      example: 42,
    }),
  })
  .openapi('User');

// const app = new Hono()
const app = new OpenAPIHono<Env>();

app.openapi(
  createRoute({
    method: 'get',
    path: '/users/{id}',
    request: {
      params: ParamsSchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: UserSchema,
          },
        },
        description: 'Retrieve the user',
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param');

    const openai = createOpenAI({
      apiKey: c.env.OPENAI_KEY,
      baseURL: c.env.OPENAI_BASE_URL,
    });

    const { object } = await generateObject({
      model: openai('gpt-4.1-nano'),
      schema: UserSchema,
      prompt: `接近真实的数据，根据输入 ${id}`,
    });

    return c.json(UserSchema.parse(object));
  },
);

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
});

app.get('/ui', swaggerUI({ url: '/doc' }));

app.get('/', (c) => {
  return c.text('Hello Hono 123!');
});

export default app;
