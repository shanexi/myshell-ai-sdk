import { MessageListContext, StrictMessage } from '@myshell-run/common-def';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import {
  editable,
  EditableHandle,
  InferDoc,
  plainSchema,
  schema,
  Delete,
} from 'edix';
import { inject, injectable } from 'inversify';
import { action, computed, makeObservable, observable } from 'mobx';
import { RefObject } from 'react';
import { UppyModel } from './uppy.model';

export const basicSchema = schema({ multiline: true });

export type ChatInputDoc = InferDoc<typeof basicSchema>;

@injectable()
export class ChatCommonModel {
  virtuosoRef?: RefObject<
    VirtuosoMessageListMethods<StrictMessage, MessageListContext>
  >;
  @observable inputText = '';

  /**
   * @deprecated 暂时还没使用 目前用的 plainSchema 会在内部转换成 string（`js`）
   */
  @observable chatInputDoc: ChatInputDoc = observable.array([]);
  public edixRefPromise: Promise<boolean>;
  @observable edixReadonly = false;
  private edixRef?: RefObject<HTMLDivElement>;
  private edixHandle: EditableHandle | null = null;
  private edixRefResolve?: (value: boolean | PromiseLike<boolean>) => void;

  constructor(@inject(UppyModel) private uppyModel: UppyModel) {
    makeObservable(this);
    this.edixRefPromise = new Promise<boolean>((resolve) => {
      this.edixRefResolve = resolve;
    });
  }

  @computed get isDragging() {
    return this.uppyModel.isDragging;
  }

  @computed get uppyStateMap() {
    return this.uppyModel.uppyStateMap;
  }

  get uppy() {
    return this.uppyModel.uppy;
  }

  get maxNumberOfFiles() {
    return this.uppyModel.maxNumberOfFiles;
  }

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

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
  }

  /**
   * @deprecated 暂时还没使用 目前用的 plainSchema 会在内部转换成 string（`js`）
   */
  @action.bound
  setChatInputDoc(chatInputDoc: ChatInputDoc) {
    this.chatInputDoc = chatInputDoc;
  }

  setupUppy(dropTarget: HTMLDivElement) {
    return this.uppyModel.setup(dropTarget);
  }

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

  setEdixRef(ref: RefObject<HTMLDivElement>) {
    if (!ref.current) return;

    this.edixRef = ref;
    if (this.edixRefResolve) {
      this.edixRefResolve(true);
    }

    const dispose = (this.edixHandle = editable(ref.current, {
      schema: plainSchema({ multiline: true }),
      onChange: this.setInputText,
    })).dispose;

    return () => {
      this.resetEdixRef();
      dispose();
    };
  }

  resetEdixRef() {
    this.edixRef = undefined;
    this.edixHandle = null;
    this.edixRefPromise = new Promise<boolean>((resolve) => {
      this.edixRefResolve = resolve;
    });
  }

  async setEdixReadonly(readonly: boolean) {
    this.edixReadonly = readonly;
    await this.edixRefPromise;
    this.edixHandle?.readonly(readonly);
  }

  /**
   * todo: 这种方式会有选中，而且不会清空 history，如果不满足需求，需要进一步 patch
   * 核心是不能通过外部 setValue(更新) value，而应该是 edix -> setValue -> value(render) 这样，所有 modification 都必须从 edix
   */
  async clearEdix() {
    await this.edixRefPromise;
    if (!this.edixRef?.current || !this.edixHandle) return;
    if (this.edixRef?.current && this.edixHandle) {
      this.edixRef?.current.focus();
      window.getSelection()?.selectAllChildren(this.edixRef.current);
      this.edixHandle.syncSelection();
      if (this.edixHandle) {
        this.edixHandle.command(Delete);
        /*
         临时方案
         主要是因为 next.js 无法清空，增加了 resetHistory + this.inputText = ''(observable 直接操作)

         如果不做 resetHistory，inputText = '' 由于 data flow 乱了（应该是 imperative edix + onChange）
         imperative edix 其实就是 selectAllChildren + syncSelection + Delete
         在 storybook 可行，但是在 next.js 失效，所以强加了 inputText = ''

         增加 resetHistory 由于 history 很干净，currentSelection 也很干净，重复一次 '' 空字符串不会搞乱 history
         */
        this.edixHandle.resetHistory();
        setTimeout(() => {
          this.inputText = '';
        });
      }
    }
  }
}
