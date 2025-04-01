import type { Root } from 'mdast';
// import Markdown from 'react-markdown';
import { h } from 'hastscript';
import remarkDirective from 'remark-directive';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { VFile } from 'vfile';
import { post } from './react-markdown';
import Counter from './counter';
import { ReplyMsgFrame } from '@myshell-run/ui-primitives';
import { DEFAULT_AVATAR, Message } from '@myshell-run/biz-def';
import { XLoading } from '../executing-msg';

const DEMO_TXT = `:::main{#readme}

Lorem:br
ipsum.

::hr

A :i[lovely]{.text-red-500} language know as :abbr[HTML]{title="HyperText Markup Language"}.

:button[🥰 generate]{#msg-id-generate}

:::
::interactive-component
`;

export const RemarkMsg = (props: Message) => {
  const { avatar = DEFAULT_AVATAR, user } = props;
  const { text } = props;
  const processor = unified()
    .use(remarkParse)
    .use([remarkDirective, remarkThink])
    .use(remarkRehype);

  const file = new VFile();
  file.value = text;

  console.time('remark');
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
    },
  });
  console.timeEnd('remark');
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

const remarkThink: Plugin<void[], Root> = function () {
  return function (tree) {
    visit(tree, function (node) {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {});

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
};
