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
import { SelectDemo } from './select-demo';
export const RemarkMsg = (props: { text: string }) => {
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
      // @ts-expect-error 先不处理 应该类似 web component 类型扩展方式
      'interactive-component': SelectDemo,
    },
  });
  console.timeEnd('remark');
  return <article className="prose dark:prose-invert">{result}</article>;
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
