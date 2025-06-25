import {
  Delete,
  editable,
  EditableCommand,
  EditableHandle,
  InferDoc,
  InsertFragment,
  InsertText,
  plainSchema,
  schema,
  voidNode,
  Position,
} from 'edix';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { RefObject } from 'react';
import { getAtSearchCriteria } from './edix.utils';

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

const InsertContext: EditableCommand<[text: string]> = (
  doc,
  selection,
  text,
) => {
  InsertFragment(doc, selection, [
    [
      // @ts-expect-error 暂时不处理 InsertFragment 类型报错
      { type: 'context', data: { content: text } },
      { type: 1 /* NODE_TEXT */, text: ' ' },
    ],
  ]);
};

const DEFAULT_CHAT_INPUT_DOC: ChatInputDoc = [
  [
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
];

// TODO: 将 chatInputDoc 和 plainSchema 暴露一些 SPI 交给上游（即 chat input plugin model 实现）
@injectable()
export class EdixModel {
  /**
   * @deprecated 推荐使用结构化 chatInputDoc
   * TODO 相关拆分出一个新的 legacy class 通过插件化注入
   */
  @observable inputText = '';
  /**
   * @description 给 structured chat input plugin 暂时不合并
   */
  @observable chatInputDoc: ChatInputDoc = observable.array([]);
  @observable atSearchCriteria: string | null = null;

  @observable contextMenuRect: DOMRect | null = null;
  @observable isContextMenuShow = false;

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
    this.contextMenuRect = rect;
  }

  @action.bound
  setAtContextMenuShow(isShow: boolean) {
    this.isContextMenuShow = isShow;
  }

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
  }

  @action.bound
  setChatInputDoc(
    chatInputDoc: ChatInputDoc,
    selection?: [anchor: Position, focus: Position],
  ) {
    this.chatInputDoc = chatInputDoc;
    this.atSearchCriteria = getAtSearchCriteria(chatInputDoc, selection);
    if (this.atSearchCriteria == null) {
      setTimeout(() => {
        this.setAtRect(null);
        this.setAtContextMenuShow(false);
      }, 1);
    }
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
      // 选中 criteria
      if (this.atSearchCriteria) {
        for (let i = 0; i < this.atSearchCriteria?.length; i++) {
          document.getSelection()?.modify('extend', 'backward', 'character');
        }
      }
      // 选中 @
      document.getSelection()?.modify('extend', 'backward', 'character');
      this.edixHandle?.syncSelection(); // 必须加上，否则下方语句无效
      // 输入的同时，替换选中（删除）
      this.edixHandle?.command(InsertContext, text + ' ');
    }, 1 /* 必须 1ms 估计是 edix 到 batch */);
  }

  async setEdixReadonly(readonly: boolean) {
    this.edixReadonly = readonly;
    await this.edixRefPromise;
    this.edixHandle?.readonly(readonly);
  }

  /**
   * 核心是不能通过外部 setValue(更新) value，而应该是 edix -> setValue -> value(render) 这样，所有 modification 都必须从 edix
   * TODO 这种方式会有选中，而且不会清空 history，如果不满足需求，需要进一步 patch
   * TODO 还有一个 bug，如果 chatInputDoc 默认有值，clearEdix 再 undo，selection 有问题
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
         主要是因为在 next.js 无法清空（不清楚原因），增加了 resetHistory + this.inputText = ''(observable 直接操作)

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
