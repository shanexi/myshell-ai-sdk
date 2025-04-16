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

# H5 设计要点




