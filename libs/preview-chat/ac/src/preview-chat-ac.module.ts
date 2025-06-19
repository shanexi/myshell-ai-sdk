import { ContainerModule, interfaces } from 'inversify';

export const previewChatACModule = new ContainerModule((bind) => {
  bindPreviewChatAC(bind);
});

export function bindPreviewChatAC(bind: interfaces.Bind) {
  //
}
