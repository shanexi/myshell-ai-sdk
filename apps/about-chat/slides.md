---
theme: default
title: 新 Chat 的设计考量 - 产品场景、插件化和工程
info: |
  ## 产品场景
  粗点说，同时应对
  - 主站 chat
  - 移动端 chat
  - shellagent chat preview
  - shellagent text to app chat
  等

  ## 插件化和工程
  插件化再内部开发主要应对工程挑战，如果开放生态，插件化对生态极其重要。
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# 新 Chat 的设计考量

应对复杂的产品场景、多端和工程质量挑战

---

# 业务目标

- H5
  - 提升渲染速度 - SSR Edge Function Edge DB 等
- 多端
  - 代码复用，测试场景统一等 - Webview 容器
- 支撑 Text to app
  - Chat 新架构能同时支撑 n 种样式和功能定制
- 工程化
  - 提升可维护性，可测试性、产品迭代效能，多人协作



---

# 为什么不能基于当前 Chat 渐进迭代

1. 数据流和样式没有解耦且没有模式遵循
2. tailwind class 可维护性低



---

# 数据流和样式没有解耦且没有模式遵循
为什么不能基于当前 Chat 渐进迭代

数据流和样式的解耦 有心但无力
- 有心：有标准的方式来处理 data/model - hooks
- 无力：views /hook 134/24 大部分逻辑都写在了 views 里，UI 和 data 耦合

<div grid="~ cols-2 gap-2" m="t-2">

```
chat-new/
├── context [2]
│   ├── MessageContext.ts
│   └── StaticContext.ts
├── hooks [24]
├── model [2]
├── services [1]
│   └── useNewChatStore.ts
├── util.ts
└── views [134]
```

```
chat/ (老版)
├── layouts
│   └── skeleton
├── model [4]
└── views [40]
    ├── Fallback.tsx
    ├── chat-body
    ├── chat-setting
    ├── editor
    └── hooks
/components/chat [62]
```
</div>

有过一次重构，但是主要是代码的重新组织。

<!-- 
统计当前目录下文件的个数（包括子目录） 
ls -lR| grep "^-" | wc -l 
-->

---

# tailwind 太多


---

# 新 Message 协议

````md magic-move {lines: true}
```json {*|3-16|17-23}
// step 1 原来的协议
{
    "id": "1859187960051482624",
    "uid": "f95739b7a27a4a8f91f1e3d94680be63",
    "replyId": "",
    "replyUid": "",
    "userId": "3524834",
    "type": "GREETING",
    "botId": "1729238978",
    "text": "✨ Welcome ...",
    "voiceUrl": "",
    "voiceFileDurationSeconds": 0,
    "audioSpeed": 1,
    "embedObjs": [],
    "extraInfo": { "consumeEnergy": 0 },
    "referenceText": "",
    "imSlashCommandInput": "",
    "componentContainer": {}, // 表单
    "inputSetting": {}, // 控制 chat input
    "uploadSetting": {}, // 控制 chat input 的 upload
    "recommendationQuestion": {} // chat input 上方的区域
}
```

```json {*}
// step 2 先看输出
{
    "id": "1859187960051482624",
    "uid": "f95739b7a27a4a8f91f1e3d94680be63",
    "replyId": "",
    "replyUid": "",
    "userId": "3524834",
    "type": "GREETING",
    "botId": "1729238978",
    "text": "✨ Welcome ...",
    "voiceUrl": "",
    "voiceFileDurationSeconds": 22,
    "audioSpeed": 1,
    "embedObjs": [],
    "extraInfo": { "consumeEnergy": 0 },
    "referenceText": "🌟 欢迎使用图片生成机器人！"
}
```

```mdc
<!-- step 3 输出部分 MDC 协议 -->
``````yaml
id: 1859187960051482624
uid: f95739b7a27a4a8f91f1e3d94680be63
userId: 3524834
type: GREETING
botId: 1729238978
``````

✨ Welcome ...

<!-- 引用消息 变体1（完整） -->
::reference{msgId=1859187960051482624}
<!-- 引用消息 变体2（复制的片段） -->
:::reference{msgId=1859187960051482624}
🌟 欢迎使用图片生成机器人！
:::
<!-- voice 包括速度 文件 电量  -->
::voice{audioSpeed=1.2, voiceUrl="https://example.com/voice.mp3" consumeEnergy=1 voiceFileDurationSeconds=22}
<!-- embedObjs  -->
::img{#abc src=https://static.myshell.run/big.PNG width=400}
```

```json
// step 4 输入部分 输入部分是固定的，可以解耦请求，甚至可以预请求
// 独立接口，支持 chat input、form 未来内部自定义组件、甚至小程序（小程序包信息元数据）
{
  "imSlashCommandInput": "",
  "componentContainer": {}, // 表单
  "inputSetting": {}, // 控制 chat input
  "uploadSetting": {}, // 控制 chat input 的 upload
  "recommendationQuestion": {} // chat input 上方的区域
}
```
````
 
---

# Chat plugins

- chat message plugin（2套机制覆盖需求）
- chat input plugin
- 通信机制

背景

插件架构一般两个目的
1. 多人协作 OC 原则
2. 生态

当前阶段
1. 主要是为了可维护性（汲取原 Chat 架构经验）
2. 进一步提升迭代速率

如果需要生态，会基于 vscode plugin extension arch，至少实现动态加载

---

# Chat Message Item plugins

Chat plugins

1. 机制1 - 基于 MDC
2. 机制2 - 根据 type 完全接管

---

# 机制1 - 基于 MDC

Chat Message Item plugins

主要目标（按照重要性排序）
1. 避免 JSON 膨胀
2. 减少消息 size
3. 支持 strema 渲染

使用
```md
:::x-checklist{#abc title="Design interactive landing pages."}
::x-checklist-item{#abc1}
::x-checklist-item{#abc2}
:::
<!-- next -->
::x-checklist-item{#abc1 status="checked" text="Create initial files"}
```
研发
```ts
register('x-checklist', Checklist);
register('x-polling', PollingMsg, PollingMsgModel);
```

---

# 机制2 - 根据 type 完全接管 (1)

Chat Message Item plugins

在最初实现 own/reply 时实现的一套简易插件机制

```ts
function legacy(bind: interfaces.Bind) {
  function addMessagePlugin(
    type: string,
    Component: React.ComponentType<Message>,
  ) {
    bind<MessageItem>(MessageItem).toConstantValue({
      type,
      render: (data) => {
        const { key, ...rest } = data;
        return <Component key={key} {...rest} />;
      },
    });
  }
  addMessagePlugin(OWN_MESSAGE_TYPE, OwnMessage);
  addMessagePlugin(REPLY_MESSAGE_TYPE, ReplyMsg);
}
```

---
layout: two-cols-header
---

# 机制2 - 根据 type 完全接管 (2)

Chat Message Item plugins

根据 `Message#type` 判断调用哪一个 plugin 的 `render`。

```ts
export const MessageItem: VirtuosoMessageListProps<Message, MessageListContext>['ItemContent'] = (props) => {
  const svc = useInjection(MessageItemSvc);
  const { data } = props;
  const item = svc.getItem(data.user === 'me' ? OWN_MESSAGE_TYPE : (data.type ?? REPLY_MESSAGE_TYPE));
  return item.render(data);
};
```

优点：
1. 直观
2. 兼容当前版本格式

缺点：
1. 不支持 stream 渲染
2. 旧格式需要讨论，如何演进支持长尾功能（更多的定制展示）

---

# Chat input plugins

Chat plugins

目前简单做了个插件系统

> 和 chat message item plugins 机制2 类似，少了 type
> 后续按需求再增加 rank（排序）等，先不 over design

特别注意，这里 `ChatInputModel` 统一处理 chat input plugins 的数据和通信问题。也是为了不 over design。

```ts
bind(ChatInputModel).toSelf().inSingletonScope();
bind<ChatInputPlugin[]>(ChatInputPlugin).toConstantValue([
  ChatInputContextPlugin,
  ChatInputUploadPlugin,
  ChatInputTextareaPlugin,
  ChatInputActionPlugin,
]);
```

---

# Chat input plugins 通信机制

Chat input plugins

1. `ChatInputModel` 统一处理 chat input plugins 的数据和通信问题。
2. `ChatInputHandlers` 扩展，（也是 composition over inheritance，即避免模板方法）使用 `Generator` or `AsyncGenerator` 
3. `ChatCommonModelFactory: (id: symbol) => ChatCommonModel` 既共享 ChatCommonModel 也能精确管理 instance。

```ts
export interface ChatInputHandlers {
  clear(): AsyncGenerator;
  sendText(text: string): AsyncGenerator;
  removeImagePreview(id: string): Generator;
}
@injectable()
export class ChatInputModel {
    constructor(@inject(ChatInputHandlers) private handlers: ChatInputHandlers,
                @inject(ChatCommonModelFactory)public factory: (id: symbol) => ChatCommonModel,
  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }
```

---

# Chat input plugins 通信机制解释

Chat input plugins 通信机制

解释下当前设计的原因，原则：**保留 progressive 扩展性可能，开发体验优先**

1. Chat Input plugins 目前没有灵活组织的场景（除 `rebind` 可以按需过滤，也非常轻量），所以为了简单，先合并一个 `ChatInputModel`，方便 input plugins 之间通信。
2. 如果未来有一些 input plugins 继续下沉（更大的复用性）则大概率可以下沉到 `ChatCommonModel` + pure component，也是常见的重构模式。
3. 即 `ChatCommonModel` 就是插件化设计的 SDK 层，或者 Headless UI 的逻辑，在上面只要通过不同的模板（JSX）则能支撑灵活的产品设计，这个目前实践的很顺利。
4. 用 `ChatInputHandlers` 代替 template method（composition over inhertiance）。除了 composition 众所周知的好处之外，在这个具体场景，主要是因为 inheritance 的实例管理不方便。
5. 使用 Iterator 来代替 event emitter，首先功能足够（支持 async event emitter，e.g. mitt 不支持，tapble 支持），甚至过份强大（actor model），保留未来可能性，当前先选择所需的特性；其又是内置语言特性，方便 IDE（跳转方便）和 debug（devtools callstack）。


---

# Chat 整体通信机制

Chat plugins

基于 `ChatInputModel` + `ChatCommonModel` + `ChatInputHandlers`。

message item 如果要通信到 ChatInput（e.g. 选择、引用等操作
1. 直接 `inject` singleton `ChatInputModel`
2. 或者实现 `ChatInputHandlers`，如果需要依赖倒置

综上，目前方案
1. 够用
2. 保留扩展性
3. 兼顾以上追求最大的开发体验

---

# 复用主站组件和适配插件

preview chat

选择这种方式的原因
- 主站3个月内不会有大变更
- 主站的代码复用，UI 层面复用，数据流分离
- 探索使用 AI 来迁移
- 验证适配插件体系，增强插件体系

方式
- 能本地启动 myshell_web_react
- 选择需要迁移组件的 bot（可能要找线上）
- 

---

# 启动主站