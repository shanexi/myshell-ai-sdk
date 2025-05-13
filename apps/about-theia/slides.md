---
theme: default
title: 探索 Theia 作为 AI Agent 基座的可能性
info: |
  ## 劣势
  - 上手难度
  - 是否 over design
  ## 优势
  - 插件（内部隔离 外部生态）
  - 交互标准（workbench）和 app 级能力（快捷键）
  ...
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# 介绍 Theia

---

# 基于 theia 开发

- 复用哪些
- 还需要建设哪些
- 上手需要哪些前置


---

## 复用哪些

基于 browser-only-minimal 

- 交互架构
  - 顶部 menus（建议去掉）
  - toolbar 定制（顶部空间代替 顶部 menus)
  - left/right side bar, bottom bar
  - 中间的 editor（不仅仅是代码编辑） 区域
- 插件架构
  - command 为中心（绑定到 menu、shortcut）
  - 注册 menus（包括 context menus）
  - 主题（需要和 tailwind 结合）
  - icon 主题（或先不考虑 去掉）
  - preference（但是需要 override 下 persistence provider）

---

# 还需要建设哪些

- 功能
- 工程

---

# 功能
还需要建设哪些

- 过滤不需要的元素
  - 顶部 menus
- 过滤 command（主要是 monaco 类）
  - 检查 command palette
- preferences 持久化层（代替 file provider）
> 可能使用 replicache 做 offline first，这样就不需要代替 file provider，架构上做了隔离
- 接上，需要接入后端服务
> 全量用 replicache 架构改动大，可 progressive

---

# 工程
还需要建设哪些

- storybook
> theia build 不支持 hot reload，建议隔离开发，然后 yalc 集成
- tailwind
> 引入很方便，postcss 接入 theia build（webpack）；主要得对齐 css var。
- rpc type infer（可选）
> 基于 protocol 方便替换后端（很想用 node 替换掉 python）

---

# 上手需要哪些前置

- 为什么是 theia
- 为什么不是 vscode

---

# 为什么是 theia

上手需要哪些前置

theia 有两套扩展机制

extension
- 静态构建扩展（plugin 是动态扩展，主要优势在生态）
- 机制是 ioc 的 rebind（主要优势在深度定制）

plugin
- 兼容 vscode plugin
- 虽然宣称有 vscode plugin 兼容性，但是看起来主要在 editor 能力暴露上，webview 的兼容性可以认为达不到产品标准
> - webview（以 gitlens、wallaby），还有 jupyter notebook（是否对 AI code 很重要）
> - 基于我们对产品特质，可以认为大部分 vscode plugin 我们都不会复用？
> - 但是基于 vscode plugin API 做 marketplace 还是很有吸引力的，webview 能力可能得建设起来


---

# 为什么不是 vscode

上手需要哪些前置

- vscode code editor 的味道很难 override 掉
> 目前看也很少基于 vscode 的产品风格上能脱离 code editor，加上 vscode fork 我经验不足，成本过高
- 我们的产品非常明确不要露出 code 的味道
> 从我们的产品特质上，vscode 不适合作为基座

---

# 如何写一个 extension 以 toolbar 为例

- 一个定制 app 的目录结构
- extension 目录结构
- contribution 介绍

---

# 一个定制 app 的目录结构

如何写一个 extension 以 toolbar 为例

一个定制 app 是通过一个集成 + 一系列扩展组成的

> - 注：可以独立一个项目，那似乎就不需要 yalc 风格的工程了
> - 目前放在 theia 里因为 theia 文档稀缺，需要方便看代码

```
./myshell-run
├── browser-only-minimal # [入口] 集成打包
├── editor # [extension] 定制 editor manager 不仅仅是 code editor
├── themes # [extension] 主题定制
└── toolbar # [extension] 功能定制
```

> 这里没有涉及到 plugin

---

# extension 目录结构 （1）

如何写一个 extension 以 toolbar 为例

```
toolbar
├── package.json
toolbar/src/browser
├── application-shell-with-toolbar-override.ts
├── my-toolbar.tsx
├── style
├── toolbar-command-contribution.ts
├── toolbar-controller.ts
├── toolbar-frontend-module.ts
├── toolbar-preference-contribution.ts
```

`package.json` - 入口是 `*-frontend-module`
> frontend-module 是因为还有 `*-backend-module` 但是大概率我们不涉及

```json
"theiaExtensions": [
  {
    "frontend": "lib/browser/toolbar-frontend-module"
  }
]
```

---

# extension 目录结构 （2）

如何写一个 extension 以 toolbar 为例

```
toolbar/src/browser
├── application-shell-with-toolbar-override.ts # 深度定制界面（一般不会用到）
├── my-toolbar.tsx # 定制 UI（普通的 react 组件）
├── style # 样式定制（这块可以完全去掉，替换成 tailwind）
├── toolbar-command-contribution.ts（command 扩展点），注册 command menu shortcut 和 jsonschema preference） 
├── toolbar-controller.ts # 可替换成 mobx
├── toolbar-frontend-module.ts # 入口
├── toolbar-preference-contribution.ts # preference 扩展
```

> theia 的深度定制能力很强，从 layout 到 sidebar + editor，定制 layout 场景很少，一般是挂在一个区域到某个 sidebar 或者中间的 editor（通过 scheme 多实例）

总结
- 入口 `frontend-module`
- 扩展点 `contribution`, `command` 和 `preference`
- 业务逻辑 展示和Controller（Model）
- （可选）定制 layout

---

# contribution 介绍 - comand

如何写一个 extension 以 toolbar 为例

1. 定制 command
2. 注册执行逻辑（一般 delgate 给 controller/model）

```ts
export namespace MyToolbarCommands {
  export const SAVE_VERSION: Command = {
      id: 'my-toolbar.action.saveVersion',
      category: 'My Toolbar',
      label: 'Save Version',
  };
}

registry.registerCommand(MyToolbarCommands.SAVE_VERSION, {
    execute: async () => {
        // 调用 controlle/model 的 method
    }
});
```

---

# contribution 介绍 - keybinding

如何写一个 extension 以 toolbar 为例

注册快捷键

```ts
keys.registerKeybinding({
    command: MyToolbarCommands.SAVE_VERSION.id,
    keybinding: 'ctrlcmd+shift+s'
});
```

---

# contribution 介绍 - menu (1)

如何写一个 extension 以 toolbar 为例

注册 menu/context menu

```ts
export namespace MyToolbarMenus {
    export const SAVE_MENU: MenuPath = ['save_menu'];
    export const SAVE_VERSION = [...SAVE_MENU, '1_save_version'];
}

registry.registerMenuAction(MyToolbarMenus.SAVE_VERSION, {
    commandId: MyToolbarCommands.SAVE_VERSION.id,
    label: 'Save Version',
    order: '0'
});
```

---

# contribution 介绍 - menu (2)

如何写一个 extension 以 toolbar 为例

```ts
this.contextMenuRenderer.render({
    menuPath: MyToolbarMenus.SAVE_MENU, // 重要 联动 registerMenuAction 实现层级
    anchor: { // popover 的相对位置
        x: button.right - button.width,
        y: button.bottom,
    },
    context: e.currentTarget,
});
```

> - 这里是一个 popover
> - 依次类推，如果 context 是一个 sidebar icon，则变成 menu，如果是顶部菜单栏，则变成 menu

没找到 theia 是否支持 popover 设计，一般来说，popover 除 display 外，还有一些简单表单的场景：
- quick input 支持单个表单项的编辑（e.g. rename）
- quick input 多步，可相似简单表单（2-3个表单项）
- quick input + 定制 dialog 可进一步实现复杂表单项

