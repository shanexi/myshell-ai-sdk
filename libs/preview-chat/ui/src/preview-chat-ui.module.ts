import { ContainerModule, interfaces } from 'inversify';

export const previewChatUIModule = new ContainerModule((bind) => {
  bindPreviewChatUI(bind);
});

export function bindPreviewChatUI(bind: interfaces.Bind) {
  //
}
