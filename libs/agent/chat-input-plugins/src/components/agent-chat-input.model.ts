import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import {
  ChatCommonModel,
  ChatInputDoc,
  context_schema,
  context_type_schema,
  UppyState,
} from '@myshell-run/common-ui';
import { FileKind, mimeData } from 'human-filetypes';
import { inject, injectable } from 'inversify';
import { action, computed, makeObservable, observable, toJS } from 'mobx';
import { isEmpty } from 'radash';
import { z } from 'zod';
import { fuzzyMatch } from './agent-chat-input.utils';
import { MimeData } from 'human-filetypes/data';

export const AgentChatInputHandlers = Symbol.for('AgentChatInputHandlers');

const mimeData2: {
  [mime: string]: MimeData;
} = {
  ...mimeData,
  'text/markdown': {
    extensions: ['.md'],
    kind: FileKind.Text,
    label: 'Markdown',
  },
};

function fromMime2(input: string): FileKind {
  if (!input) return FileKind.Unknown;

  const mime = `${input}`.toLowerCase().trim();

  // human readable mime types image/ video/ audio/ font/
  const [type] = mime.split('/');
  switch (type) {
    case 'image':
      return FileKind.Image;
    case 'video':
      return FileKind.Video;
    case 'audio':
      return FileKind.Audio;
    case 'font':
      return FileKind.Font;
  }

  // non-human readable types: application/ text/
  const match = mimeData2[mime];
  if (match) {
    return match.kind;
  }

  return FileKind.Unknown;
}

// 使用 edix 里的统一类型
export type ContextType = z.infer<typeof context_type_schema>;
export type ContextItem = z.infer<typeof context_schema>;

export type UploadItem = UppyState & {
  fileKind: FileKind;
  label?: string;
};

export interface AgentChatInputHandlers {
  /**
   * @deprecated agent chat 不再支持 clear
   */
  clear(): AsyncGenerator;

  /**
   * @deprecated 推荐使用 sendChatInputDoc
   * @description chat input 字符串， eg.g chat-input-textarea-plugin 和 chat-input-advanced-input-plugin
   */
  sendText(text: string): AsyncGenerator;

  /**
   * @description chat input 结构化数据， eg.g chat-input-structured-input-plugin
   */
  sendChatInputDoc(
    chatInputDoc: ChatInputDoc,
    upload: UploadItem[],
    context: ContextItem[],
  ): AsyncGenerator;

  removeImagePreview(id: string): Generator;
}

export const chat_message_schema = z.object({
  request_id: z.string().optional(),
  type: z.literal('chat_message'),
  args: z.object({
    // context: z.array(
    //   z.object({
    //     type: z.literal('image'),
    //     content: z.object({
    //       name: z.string(),
    //       url: z.string(),
    //     }),
    //   }),
    // ),
    context: z.array(context_schema),
    content_blocks: z.array(
      z.object({
        type: z.literal('text'),
        content: z.object({
          text: z.string(),
        }),
      }),
    ),
  }),
});

export type FilteredContextItem = ContextItem & {
  highlightedName: Array<{ char: string; isMatch: boolean }>;
  score: number;
};

@injectable()
export class AgentChatInputModel {
  /**
   * @description 和 @see contextMenus 不一样，这里是在 输入框上方 context 区域选中的列表
   * TODO 由于 insertContext 暂时没做，先不考虑联动
   *
   * 这个逻辑
   * 1. 包含 非input 输入的 e.g. dnd(还没有实现) Add to Chat
   * 2. input 输入的
   *
   * 同时 input 输入如果删除，是联动的
   * input 可以重复输入，全部删除，联动的 context 才删除
   * 而且 context 是属于 undo redo 管理的
   *
   * 我觉得可以先简化一下
   * 1. hisotry 先不做
   * 2. 联动先不做（删除 context 不删除 chatInput
   *
   * 因为现在 @ button 填写还没有做（只有 @ 输入 填写），也就是两者一定会同时存在
   *
   * 那 context items 就从 chatInputDoc 提取
   *
   */

  // @observable addedContextItems = observable.array<ContextItem>([
  //   {
  //     id: 'requirement.feature1',
  //     type: 'requirement',
  //     name: 'requirement.feature1',
  //   },
  //   { id: 'preview.message1', type: 'preview', name: 'preview.message1' },
  //   {
  //     id: 'canvas.state1.inputs',
  //     type: 'canvas',
  //     name: 'canvas.state1.inputs',
  //   },
  //   { id: 'test.test_suite1', type: 'test', name: 'test.test_suite1' },
  // ]);

  /**
   * @description context dropdown 展示
   */
  @observable contextMenus = observable.array<ContextItem>([
    { content: { name: 'Requirement' }, type: 'requirement' },
    { content: { name: 'Preview' }, type: 'preview' },
    { content: { name: 'Canvas' }, type: 'canvas' },
    { content: { name: 'Test' }, type: 'test' },
  ]);

  // TODO: inserted context 暂时没做
  // @computed get selectedContextItems() {
  //   return unique(
  //     this.chatCommon.edixModel.chatInputDoc
  //       .flat()
  //       .filter((d) => d.type === 'context')
  //       .map((d) => ({
  //         type: d.data.type,
  //         name: d.data.content,
  //       })),
  //     (d) => `${d.type}:${d.name}`,
  //   );
  // }
  // todo: 优化 当 selectedMenuIndex <filteredContextMenus.length，则默认选择 0
  @observable selectedMenuIndex = 0;

  constructor(
    @inject(AgentChatInputHandlers) private handlers: AgentChatInputHandlers,
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  // todo: 优化，过滤之后，位置不对
  @computed get filteredContextMenus(): FilteredContextItem[] {
    const searchCriteria = this.chatCommon.edixModel.atSearchCriteria;

    if (!searchCriteria || searchCriteria.criteria.trim() === '') {
      return this.contextMenus.map((item) => ({
        ...item,
        highlightedName: item.content.name
          .split('')
          .map((char) => ({ char, isMatch: false })),
        score: 0,
      }));
    }

    const results = this.contextMenus
      .map((item) => {
        const match = fuzzyMatch(item.content.name, searchCriteria.criteria);
        return {
          ...item,
          highlightedName: match.highlighted,
          score: match.score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return results;
  }

  @computed get previewItems() {
    const items = this.chatCommon.uppyModel.uppyState.map<UploadItem>(
      ([id, item]) => ({
        ...item,
        fileKind: item.type != null ? fromMime2(item.type) : FileKind.Unknown,
        label: item.type && mimeData2[item.type]?.label,
      }),
    );
    return items;
  }

  @computed get isContextItemsEmpty() {
    return this.chatCommon.addedContextItems.length === 0;
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  get canSend() {
    return (
      !isEmpty(this.chatCommon.edixModel.inputText) ||
      !this.chatCommon.edixModel.isChatInputDocEmpty ||
      !isEmpty(this.previewItems)
    );
  }

  /**
   * @deprecated 推荐使用 @see sendChatInputDoc
   */
  async sendText() {
    if (isEmpty(this.chatCommon.edixModel.inputText)) {
      return;
    }

    for await (const _ of this.handlers.sendText(
      this.chatCommon.edixModel.inputText,
    )) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.chatCommon.setInputText('');
      await this.chatCommon.edixModel.clearEdix();
    }
  }

  async sendChatInputDoc() {
    if (
      !this.canSend ||
      /* 回车选中 */ this.chatCommon.edixModel.isContextMenuShow
    ) {
      return;
    }

    for await (const _ of this.handlers.sendChatInputDoc(
      // 先手动 toJS 让 handlers 的接口不要出现 observable wrapper
      toJS(this.chatCommon.edixModel.chatInputDoc),
      toJS(this.previewItems).map((item) => ({
        ...item,
        // toJS 不支持嵌套，也不清楚这里怎么就 observable 了，先手动 toJS
        response: toJS(item.response),
      })),
      this.chatCommon.addedContextItems.map((item) => toJS(item)),
    )) {
      // TODO 不能，全部交给 edix#onChange 管理了
      // 应该封装下，不让外部操作
      // this.chatCommon.setInputText('');
      await this.chatCommon.edixModel.clearEdix();
      this.chatCommon.addedContextMap.clear();
      this.chatCommon.uppyModel.clear();
    }
  }

  /**
   * @deprecated agent chat 不再支持 clear
   */
  async clear() {
    for await (const _ of this.handlers.clear()) {
      //
    }
  }

  removeImagePreview(id: string) {
    // todo: 已经有了 chatCommon 似乎不需要 delegate 给外部 handlers
    for (const _ of this.handlers.removeImagePreview(id)) {
      // 其他操作
    }
  }

  onSelectContext(selectedIndex: number) {
    // TODO: insertContext 之前 text 为了简单，要改成 object
    this.chatCommon.edixModel.insertContext(
      this.filteredContextMenus[selectedIndex],
    );
  }

  onClose() {
    this.chatCommon.edixModel.setAtRect(null);
    this.chatCommon.edixModel.setAtContextMenuShow(false);
  }

  @action.bound
  setSelectedMenuIndex(index: number) {
    this.selectedMenuIndex = index;
  }
}
