import { inject, injectable } from 'inversify';
import { MyAppALS, type HonoEnv } from '@myshell-run/biz-def';
import { Context } from 'hono';
import { AsyncLocalStorage } from 'async_hooks';
import { Tracing } from '../simple-tracer';
import { uploadBase64 } from './upload.utils';

export class UploadSvc {
  constructor(
    @inject(MyAppALS) private readonly als: AsyncLocalStorage<Context<HonoEnv>>,
  ) {}

  async uploadBase64(base64: string) {
    const ctx = this.als.getStore();
    if (!ctx) {
      throw new Error('No ctx');
    }
    return await Tracing.startSpan('uploadBase64', (span) => {
      span.setAttributes({
        base64_size: base64.length,
      });
      return uploadBase64(base64, {
        token: ctx.env.HTTP_SERVER_UPLOAD_TOKEN,
      });
    });
  }
}
