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

export const previewChatUIModule = new ContainerModule((bind) => {
  bindPreviewChatUI(bind);
});

export function bindPreviewChatUI(bind: interfaces.Bind) {
  bind(PreviewChatModel).toSelf().inSingletonScope();
  bind(ChatInputHandlers).toDynamicValue((ctx) =>
    ctx.container.get(PreviewChatModel),
  );
  bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');

  const addLuiFormItem = addLuiFormItemPluginFactory(bind);
  addLuiFormItem<z.infer<typeof image_upload>, UploadModel>(
    'object_image_upload',
    Upload,
    image_upload,
    UploadModel,
  );
  addLuiFormItem('string_textarea', Textarea, z.any());
  addLuiFormItem('object_image_choice', ImageChoice, image_choice);
}
