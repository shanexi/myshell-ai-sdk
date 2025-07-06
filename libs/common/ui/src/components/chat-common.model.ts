import { MessageListContext, StrictMessage } from '@myshell-run/common-def';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { inject, injectable } from 'inversify';
import { computed, makeObservable } from 'mobx';
import { RefObject } from 'react';
import { context_schema, EdixModel } from './edix.model';
import { UppyModel } from './uppy.model';
import { z } from 'zod';
import { VirtuosoModel } from './virtuoso.model';

@injectable()
export class ChatCommonModel {
  constructor(
    @inject(UppyModel) public uppyModel: UppyModel,
    @inject(EdixModel) public edixModel: EdixModel,
    @inject(VirtuosoModel) public virtuosoModel: VirtuosoModel,
  ) {
    makeObservable(this);
  }

  /**
   * @deprecated edixModel
   */
  @computed get addedContextMap() {
    return this.edixModel.addedContextMap;
  }

  /**
   * @deprecated virtuosoModel
   */
  @computed
  get virtuosoRef() {
    return this.virtuosoModel.virtuosoRef;
  }

  /**
   * @deprecated edixModel
   */
  @computed get addedContextItems() {
    return Array.from(this.addedContextMap.values());
  }

  /**
   * @deprecated virtuosoModel
   */
  setVirtuosoRef = (
    ref: RefObject<
      VirtuosoMessageListMethods<StrictMessage, MessageListContext>
    >,
  ) => {
    this.virtuosoModel.setVirtuosoRef(ref);
  };

  /**
   * @deprecated virtuosoModel
   */
  appendMsg(message: StrictMessage) {
    this.virtuosoModel.appendMsg(message);
  }

  /**
   * @deprecated virtuosoModel
   */
  isMsgNoExists(key: string) {
    return this.virtuosoModel.isMsgNoExists(key);
  }

  /**
   * @deprecated edixModel
   */
  addToContext(context: z.infer<typeof context_schema>) {
    this.edixModel.addToContext(context);
  }

  /**
   * @deprecated edixModel
   */
  removeAddedContext(context: z.infer<typeof context_schema>) {
    return this.edixModel.removeAddedContext(context);
  }
}
