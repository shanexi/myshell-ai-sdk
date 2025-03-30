import { inject, injectable } from 'inversify';
import { createId } from '@paralleldrive/cuid2';
import { MyAppALS, type HonoEnv } from '@myshell-run/biz-def';
import { Context } from 'hono';
import { AsyncLocalStorage } from 'async_hooks';

export const STATIC_URL = 'https://static.myshell.run';

@injectable()
export class UploadSvc {
  constructor(
    @inject(MyAppALS) private readonly als: AsyncLocalStorage<Context<HonoEnv>>,
  ) {}

  async uploadBase64(base64: string) {
    const ctx = this.als.getStore();
    if (!ctx) {
      throw new Error('No ctx');
    }
    return await uploadBase64(base64, {
      token: ctx.env.HTTP_SERVER_UPLOAD_TOKEN,
    });
  }
}

export const uploadBase64 = async (base64: string, opt: { token: string }) => {
  const id = createId();
  const formdata = new FormData();
  const buffer = Buffer.from(base64, 'base64');
  const file = new Blob([buffer], { type: 'image/png' });
  formdata.append('uploads', file, `${id}.png`);
  formdata.append('token', opt.token);
  await fetch('https://upload.myshell.run/upload', {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  });
  return `${STATIC_URL}/${id}.png`;
};
