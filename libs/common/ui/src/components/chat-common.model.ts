import { MessageListContext, StrictMessage } from '@myshell-run/common-def';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { schema } from 'edix';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';
import { RefObject } from 'react';
import { context_schema, EdixModel } from './edix.model';
import { UppyModel } from './uppy.model';
import { z } from 'zod';

export const basicSchema = schema({ multiline: true });

@injectable()
export class ChatCommonModel {
  virtuosoRef?: RefObject<
    VirtuosoMessageListMethods<StrictMessage, MessageListContext>
  >;

  // TODO: 本来应该放在 chat input model 但是产生了 cycle deps 先放这里
  @observable addedContextMap: Map<string, z.infer<typeof context_schema>> =
    new Map();

  constructor(
    @inject(UppyModel) public uppyModel: UppyModel,
    @inject(EdixModel) public edixModel: EdixModel,
  ) {
    makeObservable(this);
  }

  @computed get addedContextItems() {
    return Array.from(this.addedContextMap.values());
  }

  setVirtuosoRef = (
    ref: RefObject<
      VirtuosoMessageListMethods<StrictMessage, MessageListContext>
    >,
  ) => {
    this.virtuosoRef = ref;
  };

  appendMsg(message: StrictMessage) {
    this.virtuosoRef?.current?.data.append(
      [message],
      ({ scrollInProgress, atBottom }) => {
        return {
          index: 'LAST',
          align: 'end',
          behavior: atBottom || scrollInProgress ? 'smooth' : 'auto',
        };
      },
    );
  }

  updateMsg(newMsg: StrictMessage) {
    this.virtuosoRef?.current?.data.map((message: StrictMessage) => {
      return message.key === newMsg.key ? newMsg : message;
    }, 'smooth');
  }

  isMsgNoExists(key: string) {
    return (
      this.virtuosoRef?.current?.data.find((m) => m.key === key) === undefined
    );
  }

  addToContext(context: z.infer<typeof context_schema>) {
    const key = `${context.type}:${context.content.name}`;
    this.addedContextMap.set(key, context);
  }

  removeAddedContext(context: z.infer<typeof context_schema>) {
    const key = `${context.type}:${context.content.name}`;
    this.addedContextMap.delete(key);
  }
}
