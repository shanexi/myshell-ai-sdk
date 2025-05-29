import { MessageItem } from '@myshell-run/common-def';
import { interfaces } from 'inversify';

export function addMessagePluginFactory<T>(bind: interfaces.Bind) {
  return function addMessagePlugin(
    type: string,
    Component: React.ComponentType<T>,
  ) {
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
