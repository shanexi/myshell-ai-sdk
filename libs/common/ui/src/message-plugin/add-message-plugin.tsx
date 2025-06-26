import { MessagePlugin } from '@myshell-run/common-def';
import { interfaces } from 'inversify';

export const MessageTypeSet = Symbol.for('MessageTypeSet');

let messageTypeSet: Set<string>;

export function addMessagePluginFactory(
  bind: interfaces.Bind,
  unbind: interfaces.Unbind,
  isBound: interfaces.IsBound,
  rebind: interfaces.Rebind,
) {
  if (!isBound(MessageTypeSet)) {
    messageTypeSet = new Set();
    bind(MessageTypeSet).toConstantValue(messageTypeSet);
  }

  return function addMessagePlugin<T>(
    type: string,
    Component: React.ComponentType<T>,
  ) {
    if (messageTypeSet.has(type)) {
      throw new Error(`Message type ${type} already exists`);
    } else {
      messageTypeSet.add(type);
    }
    bind<MessagePlugin>(MessagePlugin).toConstantValue({
      type,
      render: (data) => {
        const { key, type, text, ...rest } = data;
        // @ts-expect-error 暂时先不处理
        return <Component key={key} type={type} text={text} {...rest} />;
      },
    });
  };
}
