import type { Root } from 'mdast';
import Markdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const md = `
:::main{#readme}

Lorem:br
ipsum.

::hr

A :i[lovely]{.text-red-500} language know as :abbr[HTML]{title="HyperText Markup Language"}.

:::
`;

export const RemarkMsg = () => {
  return (
    <article className="prose dark:prose-invert">
      <Markdown
        children={md}
        remarkPlugins={[
          remarkParse,
          remarkDirective,
          remarkThink,
          remarkRehype,
          rehypeFormat,
          rehypeStringify,
        ]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </article>
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
