import {
  Message,
  MessageItem,
  RegisterMap,
  Remarkable,
  RemarkableFactory,
} from '@myshell-run/biz-def';
import { ContainerModule, interfaces } from 'inversify';
import { ExecutingMsg, Timer, XLoading } from './components/executing-msg';
import {
  ExecutingMsgModel,
  RemarkableManager,
} from './components/executing-msg.model';
import Counter from './components/remark/counter';
import { RemarkMsg } from './components/remark/remark-msg';
export const REPLY_MESSAGE_TYPE = 'reply';
export const REPLY_MESSAGE_EXECUTING_TYPE = 'reply:executing';
export const AGENT_MESSAGE_LIST_DIRECTORY_TYPE = 'agent:list-directory';

export const messageItemPluginsModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    const registerMap: RegisterMap = new Map();
    bind('RegisterMap').toConstantValue(registerMap);
    function register<T>(
      directiveName: string,
      component: React.ComponentType<T>,
      model?: interfaces.Newable<Remarkable>,
    ) {
      if (model) {
        bind(model).toSelf().inTransientScope();
      }
      registerMap.set(directiveName, [
        component as React.ComponentType<unknown>,
        model,
      ]);
    }
    function addMessagePlugin(
      type: string,
      Component: React.ComponentType<Message>,
    ) {
      bind<MessageItem>(MessageItem).toConstantValue({
        type,
        render: (data) => {
          const { key, ...rest } = data;
          return <Component key={key} {...rest} />;
        },
      });
    }

    addMessagePlugin(REPLY_MESSAGE_TYPE, RemarkMsg);
    addMessagePlugin(REPLY_MESSAGE_EXECUTING_TYPE, ExecutingMsg);
    // addMessagePlugin(AGENT_MESSAGE_LIST_DIRECTORY_TYPE, ListDirectoryMsg);

    bind(RemarkableManager).toSelf().inSingletonScope();

    bind<interfaces.Factory<Remarkable>>(RemarkableFactory).toFactory<
      Remarkable,
      Parameters<RemarkableFactory>
    >((context) => {
      return (identifier: interfaces.ServiceIdentifier, id?: string) => {
        const manager = context.container.get(RemarkableManager);
        if (!id) {
          return context.container.get<Remarkable>(identifier);
        }

        const model = manager.get<Remarkable>(id);
        if (model) {
          return model;
        } else {
          const newModel = context.container.get<Remarkable>(identifier);
          manager.set(id, newModel);
          return newModel;
        }
      };
    });

    // TODO: 涉及到了 JSX，需要移动到外面，减轻 unit test 的依赖
    register('x-timer', Timer, ExecutingMsgModel);
    register('interactive-component', Counter);
    register('x-loading', XLoading);
  },
);
