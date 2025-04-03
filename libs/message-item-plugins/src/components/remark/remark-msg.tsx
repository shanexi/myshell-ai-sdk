import { h, Properties } from 'hastscript';
import type { Root } from 'mdast';
import type {
  ContainerDirective,
  LeafDirective,
  TextDirective,
} from 'mdast-util-directive';
import remarkDirective from 'remark-directive';
import type { Plugin } from 'unified';
import { SKIP, visit } from 'unist-util-visit';

import { DEFAULT_AVATAR, Message } from '@myshell-run/common';
import { RegisterMap, RemarkableFactory } from '@myshell-run/common';
import { ReplyMsgFrame, useInjection } from '@myshell-run/ui-primitives';
import { useEffect, useState } from 'react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { VFile } from 'vfile';
import { hide } from './mdast-util-hidden';
import { post } from './react-markdown';

export const RemarkMsg = (props: Message) => {
  const { avatar = DEFAULT_AVATAR, user, text } = props;
  const factory = useInjection<RemarkableFactory>(RemarkableFactory);
  const registerMap = useInjection<RegisterMap>('RegisterMap');
  const registerComponents = Array.from(registerMap).reduce(
    (acc, [key, [Component]]) => {
      acc[key] = Component;
      return acc;
    },
    {} as Record<string, React.ComponentType<unknown>>,
  );

  const processor = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkMyPlugin, function updateCb(tagName, props) {
      const id = props.id;
      if (typeof id === 'string') {
        // 需要放到 next tick 否则 Cannot update a component (`Unknown`) while rendering a different component (`RemarkMsg`)
        setTimeout(function () {
          const model = registerMap.get(tagName)?.[1];
          if (model) {
            factory(model, id).onUpdate(props);
          }
        }, 0);
      }
    })
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
      ...registerComponents,
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
const remarkMyPlugin: Plugin<
  [(tagName: string, props: Properties) => void],
  Root
> = function (updateCb) {
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
            // 更新 props 通过 mobx model 从而组件粒度渲染（checkpoint useEffect 不要重复运行 即组件不销毁)
            updateCb(hast.tagName, hast.properties);
            hide({
              nodes: [node as Exclude<typeof node, Root>],
              index,
              parent,
            });
            // TODO: 似乎不需要 不过参考的 remark-ignore 有，先保留
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
