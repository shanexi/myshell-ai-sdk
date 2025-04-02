import type { Root } from 'mdast';
// import Markdown from 'react-markdown';
import { h } from 'hastscript';
import type {
  ContainerDirective,
  LeafDirective,
  TextDirective,
} from 'mdast-util-directive';
import remarkDirective from 'remark-directive';
import type { Plugin } from 'unified';
import { SKIP, visit } from 'unist-util-visit';

import { DEFAULT_AVATAR, Message } from '@myshell-run/biz-def';
import { ReplyMsgFrame } from '@myshell-run/ui-primitives';
import { useEffect, useState } from 'react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { VFile } from 'vfile';
import { Timer, XLoading } from '../executing-msg';
import Counter from './counter';
import { hide } from './hide';
import { post } from './react-markdown';
import { createId } from '@paralleldrive/cuid2';

export const RemarkMsg = (props: Message) => {
  const { avatar = DEFAULT_AVATAR, user, text } = props;
  const processor = unified()
    .use(remarkParse)
    .use([remarkDirective, remarkThink])
    .use(remarkRehype);

  const file = new VFile();
  file.value = text;

  // console.time('remark');
  const result = post(processor.runSync(processor.parse(file), file), {
    components: {
      code(props) {
        const { children, className, node, ...rest } = props;
        const match = /language-(\w+)/.exec(className || '');
        return (
          <code {...rest} className={className}>
            {children}
          </code>
        );
      },
      button: (props) => {
        const { children, ...rest } = props;
        return (
          <button {...rest} className="btn-blue btn">
            {children}
          </button>
        );
      },
      // @ts-expect-error 先不处理 应该类似 web component 类型扩展方式
      'interactive-component': Counter,
      'x-loading': XLoading,
      'x-timer': Timer,
    },
  });
  // console.timeEnd('remark');
  return (
    <ReplyMsgFrame
      avatar={
        <img
          className="mr-[8px] h-[32px] w-[32px] rounded-lg"
          src={avatar}
          alt={`${user} avatar`}
        />
      }
    >
      <article className="prose dark:prose-invert">{result}</article>
    </ReplyMsgFrame>
  );
};

/*
variant
1. 替换原来的消息
2. 原来的消息置灰，新消息 append
3. 删除原来的消息，新消息 append
*/
const remarkThink: Plugin<void[], Root> = function () {
  const seenNodes = new Map<
    string,
    ContainerDirective | LeafDirective | TextDirective
  >();
  return function (tree) {
    visit(tree, function (node, index, parent) {
      if (
        index !== undefined &&
        parent !== undefined &&
        (node.type === 'containerDirective' ||
          node.type === 'leafDirective' ||
          node.type === 'textDirective')
      ) {
        const hast = h(node.name, node.attributes || {});
        const data = node.data || (node.data = {});
        data.hName = hast.tagName;
        data.hProperties = hast.properties;

        const id = node.attributes?.id;
        if (id != null) {
          const seenNode = seenNodes.get(id);
          if (seenNode != null && seenNode.data) {
            seenNode.data.hProperties = {
              key: createId(), // 强制刷新
              ...node.data.hProperties,
            };
            hide({
              nodes: [node as Exclude<typeof node, Root>],
              index,
              parent,
            });
            // 似乎不需要
            return [SKIP, index]; // Skip the node we just processed
          }
          seenNodes.set(id, node);
        }
      }
    });
  };
};

export const CounterStory = () => {
  const lines = [
    `::x-timer{#abc timeLeft=100}`,
    '\n::p[hello world]{.not-prose}',
    `\n::x-timer{#abc timeLeft=5}`,
  ];
  const [text, setText] = useState(lines[0]);
  useEffect(() => {
    let currentLine = 1;
    const timer = setInterval(() => {
      if (currentLine < lines.length) {
        setText((prev: string) => {
          const txt = prev + lines[currentLine];
          currentLine++;
          return txt;
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  console.log(text);
  return <RemarkMsg key="abc" user="me" text={text} />;
};

export const ImageStory = () => {
  const lines = [
    '\n::p[hello world]{.not-prose}',
    `\n::img{#abc src=https://static.myshell.run/mini.PNG width=400}`,
    `\n::img{#abc src=https://static.myshell.run/small.PNG width=400}`,
    `\n::img{#abc src=https://static.myshell.run/medium.PNG width=400}`,
    `\n::img{#abc src=https://static.myshell.run/big.PNG width=400}`,
  ];
  const [text, setText] = useState(lines[0]);
  useEffect(() => {
    let currentLine = 1;
    const timer = setInterval(() => {
      if (currentLine < lines.length) {
        setText((prev: string) => {
          const txt = prev + lines[currentLine];
          currentLine++;
          return txt;
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  console.log(text);
  return <RemarkMsg key="abc" user="me" text={text} />;
};
