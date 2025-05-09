import { Message } from '@myshell-run/common-def';

export const MOCK_IMG =
  'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp';

let idCounter = 0;

export function randomMessage(user: Message['user']): Message {
  return {
    user,
    key: `${idCounter++}`,
    text: randTextRange({ min: user === 'me' ? 20 : 100, max: 200 }),
  };
}
// 生成指定长度范围内的随机文本
export function randTextRange({
  min,
  max,
}: {
  min: number;
  max: number;
}): string {
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  let result = '';

  while (result.length < length) {
    result += randPhrase() + ' ';
  }

  // 截取到指定长度
  return result.slice(0, length);
}

// 生成随机文本的辅助函数
export function randPhrase(): string {
  const phrases = [
    '你好！',
    '很高兴见到你',
    '今天天气怎么样？',
    '我能帮你什么忙？',
    '这是一个测试',
    '请问有什么需要？',
    '我在这里',
    '有问题随时问我',
    '希望一切顺利',
    '祝你有美好的一天',
    '需要帮助吗？',
    '我是聊天机器人',
    '让我们开始聊天吧',
    '有什么有趣的事情？',
    '我们来聊聊吧',
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}
