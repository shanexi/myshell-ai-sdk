import { inject, injectable } from 'inversify';
import { UppyModel } from '@myshell-run/common-ui';
import { computed } from 'mobx';
import { z } from 'zod';

@injectable()
export class UploadModel {
  constructor(@inject(UppyModel) public uppyModel: UppyModel) {
    //
  }

  // form upload 现仅支持单文件
  @computed get file() {
    return this.uppyModel.uppyStateMap.entries().next().value?.[1];
  }
}

// https://zod.dev/json-schema
// TODO 描述 value 类型，生成 json-schema
// 不过也不行，因为还要过滤 json schema
// 要不现在先手动写吧，或者就直接用 ajv parse 吧
export const upload_schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.literal('array'),
  items: z.object({
    type: z.literal('object'),
    properties: z.object({
      // 参考 UppyFile 结构
      file: z.object({
        type: z.literal('object'),
        properties: z.object({
          uploadURL: z.object({
            type: z.literal('string'),
          }),
          name: z.object({
            type: z.literal('string'),
          }),
          // 单个大小限制
          size: z
            .object({
              type: z.literal('number'),
              maxLength: z.number(),
            })
            .optional(),
          // 类型限制
          type: z
            .object({
              type: z.literal('string'),
              enum: z.array(z.string()),
            })
            .optional(),
        }),
      }),
    }),
  }),
  maxItems: z.number(), // 上传数量限制
  examples: z
    .array(
      z.object({
        file: z.object({
          uploadURL: z.string(),
          name: z.string(),
        }),
      }),
    )
    .optional(),
});

// 直接写也很快，而且 validations 因为是 runtime 指定的，这里也写不出来
// 也只能写一个结构，只是方便前端类型校验
export const upload_value = z.array(
  z.object({
    file: z.object({
      uploadURL: z.string(),
      name: z.string(),
      size: z.number().optional(),
      type: z.string().optional(),
    }),
  }),
);
