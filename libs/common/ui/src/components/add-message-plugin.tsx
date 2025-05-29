import { MessageItem, StrictMessage } from '@myshell-run/common-def';
import { interfaces } from 'inversify';

export function addMessagePluginFactory(bind: interfaces.Bind) {
  // 校验类型保留
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function addMessagePlugin<T extends StrictMessage>(
    type: string,
    Component: React.ComponentType<StrictMessage>,
  ) {
    bind<MessageItem>(MessageItem).toConstantValue({
      type,
      render: (data) => {
        const { key, ...rest } = data;
        return <Component key={key} {...rest} />;
      },
    });
  };
}
