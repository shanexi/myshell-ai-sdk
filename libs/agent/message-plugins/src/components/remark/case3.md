## Requirements Analysis

我们已经非常清楚你的需求：bot每天定时自动推送通过X（Twitter）等渠道抓取并用中文摘要的AI领域热点资讯，内容来源包括自动选定的KOL、活跃用户、热度关键词，每条带“已热榜天数”标签和一个点击可查看更多详情的按钮。推送对象是myshell bot本身。  

## Key Functionalities

- 自动联网检索并确定AI领域Top 5 KOL
- 按近一个月推文数量筛选AI相关活跃用户
- 热度关键词分析与高热推文筛选
- 热榜天数统计
- 中文摘要生成
- 每日定时汇总归纳推送（不能自定义时间）
- 每条携带“查看原文”按钮
- 用户点击按钮后推送详细原文
- 功能都应全自动、无需人工干预

## Widget Requirements

### 可用现有组件

- Twitter/X 检索：@myshell/1784206090390036480（Twitter Search Widget）
- LLM摘要生成（如：GPTWidget、ClaudeWidget 等大语言模型）
- 消息格式化、定时推送部分（需结合shellagent流程实现）
- LUI Button（通过ShellAgent对话系统消息交互实现）

### 需要自定义组件

1. KOL 自动榜单抓取与账号返回组件（联网抓取Top 5榜单账号名等）
2. 活跃用户筛选&数据聚合组件
3. 关键词热度统计与精选推文抓取组件
4. 热榜天数计算/标记组件
5. 推文多来源聚合与中英文摘要/格式化整理组件
6. 用户查看原文详细内容组件

## State Flow Design

- 定时触发
  - 联网抓取KOL榜单、活跃用户、热点关键词
  - 批量抓取候选推文
  - 对每条推文用LLM自动生成中文摘要
  - 统计热榜天数
  - 格式化推送内容+生成LUI Button
- 推送
  - 总结消息与列表发送，对每条资讯带“查看原文”按钮
- 用户交互
  - 点击按钮时显示该推文详细原文内容
- 每日自动循环

## Implementation Plan

1. 梳理现有（Twitter Search、GPT/Claude等）与自定义widget需求
2. 先生成“榜单数据获取与聚合、汇总、摘要”的自定义widget
3. 完成每一步后逐步测试与集成
4. 最后整合到一个完整shellagent应用

---

## Next Action

我将继续梳理最关键的widget需求清单，并为每个自定义widget写出详细开发说明，然后逐步开始创建。

---

## Confirmation Request

在KOL自动榜单抓取这部分：你是否需要聚焦“全球影响力型AI专家”，还是更偏“中国区影响力KOL”？（如不指定则抓取全球榜单）",
            