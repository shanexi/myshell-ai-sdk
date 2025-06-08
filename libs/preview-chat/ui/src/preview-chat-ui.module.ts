import { ContainerModule, interfaces } from 'inversify';
import { PreviewChatModel } from './components/preview-chat-model';
import { ChatInputHandlers } from '@myshell-run/preview-chat-input-plugins';
import { UploadEndpoint } from '@myshell-run/common-def';
import { addLuiFormItemPluginFactory } from '@myshell-run/common-ui';
import { image_upload, Upload } from './components/lui-form/upload/upload';
import { Textarea } from './components/lui-form/textarea/textarea';
import {
  image_choice,
  ImageChoice,
} from './components/lui-form/image-choice/image-choice';
import { UploadModel } from './components/lui-form/upload/upload.model';
import { z } from 'zod';
import { MessageItemHandlers } from '@myshell-run/preview-chat-message-item-plugins';

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
  bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');

  const addLuiFormItem = addLuiFormItemPluginFactory(bind);
  // todo: 这些 variant 不能随便动（但是因为可以 fallback 所有不用特别严格）
  // 如果要严格校验（比如当作 protocol）则可以写一个 zod schema 提前校验下，同时也在 addLuiFormItemPluginFactory 抢类型
  addLuiFormItem<z.infer<typeof image_upload>, UploadModel>(
    'object_image_upload',
    Upload,
    image_upload,
    UploadModel,
  );
  addLuiFormItem('string_textarea', Textarea, z.any());
  addLuiFormItem('object_image_choice', ImageChoice, image_choice);
}
