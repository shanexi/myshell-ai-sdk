import { Message, MessageItem } from '@myshell-run/def';
import { ContainerModule } from 'inversify';
import { ReplyMessage } from './components/reply-message';

export const messageItemPluginsModule = new ContainerModule((bind) => {
  function addPlugin(type: string, Component: React.ComponentType<Message>) {
    bind<MessageItem>(MessageItem).toConstantValue({
      type,
      render: (data) => <Component {...data} />,
    });
  }

  addPlugin('reply', ReplyMessage);
});
