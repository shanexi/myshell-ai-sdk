import {
  Clear,
  editable,
  EditableCommand,
  EditableHandle,
  InferDoc,
  InsertFragment,
  InsertText,
  plainSchema,
  Position,
  schema,
  voidNode,
} from 'edix';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { isEmpty } from 'radash';
import { RefObject } from 'react';
import { z } from 'zod';
import { AtSearchCriteria, getAtSearchCriteria } from './edix.utils';

export const context_type_schema = z.enum([
  'preview',
  'requirement',
  'canvas',
  'test',
  // 'image', // 图片在后端也算 context
]);

export const context_schema = z.object({
  type: context_type_schema.optional(),
  content: z
    .object({
      name: z.string(),
    })
    .passthrough(),
});

export const chatInputDocSchema = schema({
  multiline: true,
  void: {
    context: voidNode({
      is: (e) => e.contentEditable === 'false',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data: (e) => ({ content: e.textContent!, type: e.dataset.type! }),
      plain: (d) => d.content,
    }),
  },
});

export type ChatInputDoc = InferDoc<typeof chatInputDocSchema>;

const InsertContext: EditableCommand<[text: string, type: string]> = (
  doc,
  selection,
  text,
  type,
) => {
  InsertFragment(doc, selection, [
    [
      // @ts-expect-error 暂时不处理 InsertFragment 类型报错
      { type: 'context', data: { content: text, type } },
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
        type: 'canvas',
      },
    },
  ],
];

// TODO: 将 chatInputDoc 和 plainSchema 暴露一些 SPI 交给上游（即 chat input plugin model 实现）
@injectable()
export class EdixModel {
  /**
   * @deprecated 推荐使用结构化 @see chatInputDoc
   * TODO 相关拆分出一个新的 legacy class 通过插件化注入
   */
  @observable inputText = '';
  /**
   * @description 给 structured chat input plugin 暂时不合并
   */
  @observable chatInputDoc: ChatInputDoc = observable.array([]);
  @observable atSearchCriteria: AtSearchCriteria = null;
  contextMenuRect: DOMRect | null = null;
  @observable isContextMenuShow = false;

  public edixRefPromise: Promise<boolean>;
  @observable edixReadonly = false;
  public edixHandle: EditableHandle | null = null;
  private edixRef?: RefObject<HTMLDivElement>;
  private edixRefResolve?: (value: boolean | PromiseLike<boolean>) => void;

  get isChatInputDocEmpty() {
    if (isEmpty(this.chatInputDoc.flat())) return true;
    if (this.chatInputDoc.flat().length !== 1) return false;
    const item = this.chatInputDoc.flat()[0];
    if (item.type === 'text' && item.text === '') return true;
    return false;
  }

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

  /**
   *
   * @deprecated @see setChatInputDoc
   */
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
    if (this.atSearchCriteria?.char == null) {
      this.setAtRect(null);
      this.setAtContextMenuShow(false);
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

  /**
   * @description 输入 @ 插入的 context 注意还有一个 agent chat input 的 addToContext
   */
  async insertContext(context: z.infer<typeof context_schema>) {
    // 隐藏 dropdown
    this.setAtRect(null);
    this.setAtContextMenuShow(false);

    await this.edixRefPromise;
    this.edixHandle?.command(InsertText, ''); // 插入一个空字符（尝试了几种这种方案 work） 确保 dropdown 小时候，focus 在 contenteditable 否则下面的 move focus backward 无效
    setTimeout(() => {
      // 需要根据当前的 anchor
      if (this.atSearchCriteria) {
        if (this.atSearchCriteria.char === '@') {
          // 先往后移动
          for (let i = 0; i < this.atSearchCriteria?.criteria.length; i++) {
            document.getSelection()?.modify('move', 'forward', 'character');
          }
        } else {
          const { criteria, char } = this.atSearchCriteria;
          const remain = criteria.slice(criteria.indexOf(char) + 1);
          for (let i = 0; i < remain.length; i++) {
            document.getSelection()?.modify('move', 'forward', 'character');
          }
        }
        for (let i = 0; i < this.atSearchCriteria?.criteria.length; i++) {
          document.getSelection()?.modify('extend', 'backward', 'character');
        }
      }
      // 选中 @
      document.getSelection()?.modify('extend', 'backward', 'character');
      this.edixHandle?.syncSelection(); // 必须加上，否则下方语句无效
      // 输入的同时，替换选中（删除）
      this.edixHandle?.command(
        InsertContext,
        context.content.name + ' ',
        context.type || '<undef>',
      );
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
      this.edixHandle.command(Clear);
    }
  }
}
