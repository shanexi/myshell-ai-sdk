import { inject, injectable } from 'inversify';
import { hunyuan } from 'tencentcloud-sdk-nodejs-hunyuan';
import { HonoCtx } from '../lib/hono-ctx';
import { LLM, LLMMessage } from './llm';
import { STATIC_URL, UploadSvc } from '../lib/upload.svc';
const Client = hunyuan.v20230901.Client;

// https://github.com/TencentCloud/tencentcloud-sdk-nodejs/blob/master/examples/hunyuan/v20230901/chat_completions.ts
@injectable()
export class Hunyuan implements LLM {
  model = 'hunyuan';
  constructor(
    @inject(HonoCtx) private readonly ctx: HonoCtx,
    @inject(UploadSvc) private readonly uploadSvc: UploadSvc,
  ) {
    //
  }

  async *chat(
    model: string,
    prompt: string,
  ): AsyncGenerator<LLMMessage, void, unknown> {
    const client = new Client({
      credential: {
        secretId: this.ctx.env.TECENT_CLOUD_SECRET_ID,
        secretKey: this.ctx.env.TECENT_CLOUD_SECRET_KEY,
      },
      region: 'ap-guangzhou',
      profile: {
        httpProfile: {
          endpoint: 'hunyuan.tencentcloudapi.com',
        },
      },
    });

    const res = await client.TextToImageLite({
      Prompt: prompt,
      Style: '201',
      Resolution: '512:512',
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
