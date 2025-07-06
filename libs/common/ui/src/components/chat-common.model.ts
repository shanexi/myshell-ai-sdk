import { MessageListContext, StrictMessage } from '@myshell-run/common-def';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { inject, injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';
import { RefObject } from 'react';
import { context_schema, EdixModel } from './edix.model';
import { UppyModel } from './uppy.model';
import { z } from 'zod';
import { VirtuosoModel } from './virtuoso.model';

@injectable()
export class ChatCommonModel {
  // TODO: 本来应该放在 chat input model 但是产生了 cycle deps 先放这里
  @observable addedContextMap: Map<string, z.infer<typeof context_schema>> =
    new Map();

  constructor(
    @inject(UppyModel) public uppyModel: UppyModel,
    @inject(EdixModel) public edixModel: EdixModel,
    @inject(VirtuosoModel) public virtuosoModel: VirtuosoModel,
  ) {
    makeObservable(this);
  }

  get virtuosoRef() {
    return this.virtuosoModel.virtuosoRef;
  }

  @computed get addedContextItems() {
    return Array.from(this.addedContextMap.values());
  }

  setVirtuosoRef = (
    ref: RefObject<
      VirtuosoMessageListMethods<StrictMessage, MessageListContext>
    >,
  ) => {
    this.virtuosoModel.setVirtuosoRef(ref);
  };

  /**
   * @deprecated 当前阶段建议直接使用 virtuosoRef
   */
  appendMsg(message: StrictMessage) {
    this.virtuosoModel.appendMsg(message);
  }

  isMsgNoExists(key: string) {
    return this.virtuosoModel.isMsgNoExists(key);
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
