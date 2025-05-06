import { MyAppALS, type HonoEnv } from '@myshell-run/biz-def';
import { Context } from 'hono';
import { inject, injectable } from 'inversify';
import { hunyuan } from 'tencentcloud-sdk-nodejs-hunyuan';
import { UploadSvc } from '../lib/upload.svc';
import { LLM, LLMMessage } from './llm';
import { AsyncLocalStorage } from 'async_hooks';
import { Tracing } from '../simple-tracer';
const Client = hunyuan.v20230901.Client;

// https://github.com/TencentCloud/tencentcloud-sdk-nodejs/blob/master/examples/hunyuan/v20230901/chat_completions.ts
@injectable()
export class Hunyuan implements LLM {
  model = 'hunyuan-TextToImageLite';
  constructor(
    @inject(MyAppALS) private readonly als: AsyncLocalStorage<Context<HonoEnv>>,
    @inject(UploadSvc) private readonly uploadSvc: UploadSvc,
  ) {
    //
  }

  async *chat(
    model: string,
    prompt: string,
  ): AsyncGenerator<LLMMessage, void, unknown> {
    const ctx = this.als.getStore();
    if (!ctx) {
      throw new Error('No ctx');
    }

    const client = new Client({
      credential: {
        secretId: ctx.env.TECENT_CLOUD_SECRET_ID,
        secretKey: ctx.env.TECENT_CLOUD_SECRET_KEY,
      },
      region: 'ap-guangzhou',
      profile: {
        httpProfile: {
          endpoint: 'hunyuan.tencentcloudapi.com',
        },
      },
    });

    const res = await Tracing.startSpan('hunyuan_TextToImageLite', (span) => {
      span.setAttributes({
        prompt: prompt,
      });
      return client.TextToImageLite({
        Prompt: prompt,
        Style: '201',
        Resolution: '512:512',
      });
    });

    if (res.ResultImage) {
      const imgUrl = await this.uploadSvc.uploadBase64(res.ResultImage);

      yield {
        content: `![](${imgUrl})`,
      };
    } else {
      // TODO 异常处理
      yield {
        content: '',
      };
    }
  }
}
