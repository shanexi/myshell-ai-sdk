import { ContainerModule, interfaces } from 'inversify';
import { PreviewChatModel } from './components/preview-chat-model';
import { ChatInputHandlers } from '@myshell-run/preview-chat-input-plugins';
import { UploadEndpoint } from '@myshell-run/common-def';
import { addLuiFormItemPluginFactory } from '@myshell-run/common-ui';
import { Upload } from './components/lui-form/upload';
import { Textarea } from './components/lui-form/textarea';
import { ImageChoice } from './components/lui-form/image-choice';
import { UploadModel } from './components/lui-form/upload.model';

export const previewChatUIModule = new ContainerModule((bind) => {
  bindPreviewChatUI(bind);
});

export function bindPreviewChatUI(bind: interfaces.Bind) {
  bind(PreviewChatModel).toSelf().inSingletonScope();
  bind(ChatInputHandlers).toDynamicValue((ctx) =>
    ctx.container.get(PreviewChatModel),
  );
  bind(UploadEndpoint).toConstantValue('http://localhost:3333/api/upload');
  bind(UploadModel).toSelf().inSingletonScope();

  const addLuiFormItem = addLuiFormItemPluginFactory(bind);
  addLuiFormItem('object_image_upload', Upload);
  addLuiFormItem('string_textarea', Textarea);
  addLuiFormItem('object_image_choice', ImageChoice);
}
