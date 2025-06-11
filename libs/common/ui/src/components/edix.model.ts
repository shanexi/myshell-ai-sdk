import {
  Delete,
  editable,
  EditableHandle,
  InferDoc,
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
      {
        type: 'text',
        text: '✅ 我已完成在线学习平台的全面需求分析',
      },
      {
        type: 'context',
        data: {
          content: 'canvas.state1.inputs.variable1',
        },
      },
      { type: 'text', text: ' ，并更新了所有相关文档：\\n\\n📋 **' },
    ],
    [{ type: 'text', text: 'Type @ to reference context' }],
  ]);

  @observable atRect: DOMRect | null = null;
  @observable isAtContextMenuShow = false;

  public edixRefPromise: Promise<boolean>;
  @observable edixReadonly = false;
  private edixRef?: RefObject<HTMLDivElement>;
  private edixHandle: EditableHandle | null = null;
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
