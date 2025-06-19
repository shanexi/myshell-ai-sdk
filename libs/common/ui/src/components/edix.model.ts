import {
  Delete,
  editable,
  EditableHandle,
  InferDoc,
  InsertText,
  plainSchema,
  schema,
  voidNode,
} from 'edix';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { RefObject } from 'react';

export const chatInputDocSchema = schema({
  multiline: true,
  void: {
    context: voidNode({
      is: (e) => e.contentEditable === 'false',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data: (e) => ({ content: e.textContent! }),
      plain: (d) => d.content,
    }),
  },
});

export type ChatInputDoc = InferDoc<typeof chatInputDocSchema>;

@injectable()
export class EdixModel {
  @observable inputText = '';
  /**
   * @description 给 structured chat input plugin 暂时不合并
   */
  @observable chatInputDoc: ChatInputDoc = observable.array([
    [
      // TODO 应该是个 bug，必须有一个 text（非空） 在最前面 先这样避开
      // 到时候输入 context 的时候，就额外增加一个 空字符
      {
        type: 'text',
        text: ' ',
      },
      {
        type: 'context',
        data: {
          content: 'canvas.state1.inputs.variable1',
        },
      },
    ],
  ]);

  @observable atRect: DOMRect | null = null;
  @observable isAtContextMenuShow = false;

  public edixRefPromise: Promise<boolean>;
  @observable edixReadonly = false;
  public edixHandle: EditableHandle | null = null;
  private edixRef?: RefObject<HTMLDivElement>;
  private edixRefResolve?: (value: boolean | PromiseLike<boolean>) => void;

  constructor() {
    makeObservable(this);
    this.edixRefPromise = new Promise<boolean>((resolve) => {
      this.edixRefResolve = resolve;
    });
  }

  @action.bound
  setAtRect(rect: DOMRect | null) {
    this.atRect = rect;
  }

  @action.bound
  setAtContextMenuShow(isShow: boolean) {
    this.isAtContextMenuShow = isShow;
  }

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
  }

  @action.bound
  setChatInputDoc(chatInputDoc: ChatInputDoc) {
    this.chatInputDoc = chatInputDoc;
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

  setEdixRefStructured(ref: RefObject<HTMLDivElement>) {
    if (!ref.current) return;

    this.edixRef = ref;
    if (this.edixRefResolve) {
      this.edixRefResolve(true);
    }

    const dispose = (this.edixHandle = editable(ref.current, {
      schema: chatInputDocSchema,
      onChange: this.setChatInputDoc,
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

  // todo 处理 enter
  // 现在 enter 是发送
  async insertContext(text: string) {
    // 隐藏 dropdown
    this.setAtRect(null);
    this.setAtContextMenuShow(false);

    await this.edixRefPromise;
    this.edixHandle?.command(InsertText, ''); // 插入一个空字符（尝试了几种这种方案 work） 确保 dropdown 小时候，focus 在 contenteditable 否则下面的 move focus backward 无效
    setTimeout(() => {
      document.getSelection()?.modify('extend', 'backward', 'character');
      this.edixHandle?.syncSelection(); // 必须加上，否则下方语句无效
      this.edixHandle?.command(InsertText, text + ' ');
    }, 1 /* 必须 1ms 估计是 edix 到 batch */);
  }

  async setEdixReadonly(readonly: boolean) {
    this.edixReadonly = readonly;
    await this.edixRefPromise;
    this.edixHandle?.readonly(readonly);
  }

  /**
   * TODO 这种方式会有选中，而且不会清空 history，如果不满足需求，需要进一步 patch
   * TODO 还有一个 bug，如果 chatInputDoc 默认有值，clearEdix 再 undo，selection 有问题
   * 核心是不能通过外部 setValue(更新) value，而应该是 edix -> setValue -> value(render) 这样，所有 modification 都必须从 edix
   */
  async clearEdix() {
    await this.edixRefPromise;
    if (!this.edixRef?.current || !this.edixHandle) return;
    if (this.edixRef?.current && this.edixHandle) {
      this.edixRef?.current.focus();
      document.getSelection()?.selectAllChildren(this.edixRef.current);
      this.edixHandle.syncSelection();
      if (this.edixHandle) {
        this.edixHandle.command(Delete);
        /*
         临时方案
         主要是因为 next.js 无法清空，增加了 resetHistory + this.inputText = ''(observable 直接操作)

         如果不做 resetHistory，inputText = '' 由于 data flow 乱了（应该是 imperative edix + onChange）
         imperative edix 其实就是 selectAllChildren + syncSelection + Delete
         在 storybook 可行，但是在 next.js 失效，所以强加了 inputText = ''（补充了 chatInputDoc = [] 清空）

         增加 resetHistory 由于 history 很干净，currentSelection 也很干净，重复一次 '' 空字符串不会搞乱 history
         */
        this.edixHandle.resetHistory();
        setTimeout(() => {
          this.inputText = '';
          this.chatInputDoc = [];
        });
      }
    }
  }
}
