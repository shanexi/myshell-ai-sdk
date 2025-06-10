import { MessageListContext, StrictMessage } from '@myshell-run/common-def';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { InferDoc, schema } from 'edix';
import { inject, injectable } from 'inversify';
import { action, computed, makeObservable } from 'mobx';
import { RefObject } from 'react';
import { EdixModel } from './edix.model';
import { UppyModel } from './uppy.model';

export const basicSchema = schema({ multiline: true });

export type ChatInputDoc = InferDoc<typeof basicSchema>;

@injectable()
export class ChatCommonModel {
  virtuosoRef?: RefObject<
    VirtuosoMessageListMethods<StrictMessage, MessageListContext>
  >;
  /**
   * @deprecated directly use edixModel;
   */
  @computed get inputText() {
    return this.edixModel.inputText;
  }

  /**
   * @deprecated directly use edixModel;
   */
  @computed get chatInputDoc() {
    return this.edixModel.chatInputDoc;
  }
  /**
   * @deprecated directly use edixModel;
   */
  @computed get edixReadonly() {
    return this.edixModel.edixReadonly;
  }

  constructor(
    @inject(UppyModel) public uppyModel: UppyModel,
    @inject(EdixModel) public edixModel: EdixModel,
  ) {
    makeObservable(this);
  }

  /**
   * @deprecated directly use uppyModel;
   */
  @computed get isDragging() {
    return this.uppyModel.isDragging;
  }

  /**
   * @deprecated directly use uppyModel;
   */
  @computed get uppyStateMap() {
    return this.uppyModel.uppyStateMap;
  }

  /**
   * @deprecated directly use uppyModel;
   */
  get uppy() {
    return this.uppyModel.uppy;
  }

  /**
   * @deprecated directly use uppyModel;
   */
  get multiple() {
    return this.uppyModel.multiple;
  }

  /**
   * @deprecated directly use uppyModel;
   */
  get accept() {
    return this.uppyModel.accept;
  }

  setVirtuosoRef = (
    ref: RefObject<
      VirtuosoMessageListMethods<StrictMessage, MessageListContext>
    >,
  ) => {
    this.virtuosoRef = ref;
  };

  /**
   * @deprecated directly use edixModel;
   */
  @action.bound
  setInputText(text: string) {
    this.edixModel.setInputText(text);
  }

  /**
   * @deprecated directly use edixModel;
   */
  @action.bound
  setChatInputDoc(chatInputDoc: ChatInputDoc) {
    this.edixModel.setChatInputDoc(chatInputDoc);
  }

  /**
   * @deprecated directly use uppyModel;
   */
  setupUppy(dropTarget: HTMLDivElement) {
    return this.uppyModel.setup(dropTarget);
  }

  /**
   * @deprecated directly use uppyModel;
   */
  removeFile(id: string) {
    this.uppyModel.removeFile(id);
  }

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

  /**
   * @deprecated directly use edixModel;
   */
  setEdixRef(ref: RefObject<HTMLDivElement>) {
    return this.edixModel.setEdixRef(ref);
  }

  /**
   * @deprecated directly use edixModel;
   */
  resetEdixRef() {
    this.edixModel.resetEdixRef();
  }

  /**
   * @deprecated directly use edixModel;
   */
  async setEdixReadonly(readonly: boolean) {
    this.edixModel.setEdixReadonly(readonly);
  }

  /**
   * @deprecated directly use edixModel;
   */
  async clearEdix() {
    this.edixModel.clearEdix();
  }
}
