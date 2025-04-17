---
# You can also start simply with 'default'
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# 不需要花里胡哨的背景 应该更多的是企业标识
# background: https://cover.sli.dev

# some information about your slides (markdown enabled)
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

# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
# seoMeta:
#  ogImage: https://cover.sli.dev
---

# 新 Chat 的设计考量

应对复杂的产品场景、多端和工程质量挑战

---
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
transition: slide-up
---

# 为什么不能基于当前 Chat 渐进迭代

1. 数据流和样式没有解耦且没有模式遵循
2. tailwind class 可维护性低



---
level: 2
transition: slide-up
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
level: 2
---

# tailwind 太多


---
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

 






