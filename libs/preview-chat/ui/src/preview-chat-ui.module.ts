import { ContainerModule, interfaces } from 'inversify';
import { PreviewChatModel } from './components/preview-chat-model';
import { ChatInputHandlers } from '@myshell-run/preview-chat-input-plugins';
import { addLuiFormItemPluginFactory } from '@myshell-run/common-ui';
import { Upload } from './components/lui-form/upload/upload';
import { Textarea } from './components/lui-form/textarea/textarea';
import {
  image_choice,
  ImageChoice,
} from './components/lui-form/image-choice/image-choice';
import {
  UploadModel,
  upload_schema,
} from './components/lui-form/upload/upload.model';
import { z } from 'zod';
import { MessageItemHandlers } from '@myshell-run/preview-chat-message-item-plugins';
import { LuiFormModel } from './components/lui-form/lui-form.model';

export const previewChatUIModule = new ContainerModule((bind) => {
  bindPreviewChatUI(bind);
});

export function bindPreviewChatUI(bind: interfaces.Bind) {
  bind(PreviewChatModel).toSelf().inSingletonScope();
  bind<ChatInputHandlers>(ChatInputHandlers).toDynamicValue((ctx) =>
    ctx.container.get(PreviewChatModel),
  );
  bind<MessageItemHandlers>(MessageItemHandlers).toDynamicValue((ctx) =>
    ctx.container.get(PreviewChatModel),
  );
  // bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');

  bind(LuiFormModel).toSelf().inTransientScope();
  const addLuiFormItem = addLuiFormItemPluginFactory(bind);
  // todo: 这些 variant 不能随便动（但是因为可以 fallback 所有不用特别严格），也就是 variant 应该是个 protocol，前后端都要感知
  // 如果要严格校验（比如当作 protocol）则可以写一个 zod schema 提前校验下，同时也在 addLuiFormItemPluginFactory 抢类型
  addLuiFormItem<z.infer<typeof upload_schema>, UploadModel>(
    'object_image_upload',
    Upload,
    upload_schema,
    UploadModel,
  );
  addLuiFormItem('string_textarea', Textarea, z.any());
  addLuiFormItem('object_image_choice', ImageChoice, image_choice);
}
