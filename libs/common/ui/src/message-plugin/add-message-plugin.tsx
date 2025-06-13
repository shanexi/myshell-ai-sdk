import { MessageItem } from '@myshell-run/common-def';
import { interfaces } from 'inversify';

export const MessageTypeSet = Symbol('MessageTypeSet');

let messageTypeSet: Set<string>;

export function addMessagePluginFactory<T>(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  if (!isBound(MessageTypeSet)) {
    messageTypeSet = new Set();
    bind(MessageTypeSet).toConstantValue(messageTypeSet);
  }

  return function addMessagePlugin(
    type: string,
    Component: React.ComponentType<T>,
  ) {
    if (messageTypeSet.has(type)) {
      throw new Error(`Message type ${type} already exists`);
    } else {
      messageTypeSet.add(type);
    }
    bind<MessageItem>(MessageItem).toConstantValue({
      type,
      render: (data) => {
        const { key, type, text, ...rest } = data;
        // @ts-expect-error 暂时先不处理
        return <Component key={key} type={type} text={text} {...rest} />;
      },
    });
  };
}
