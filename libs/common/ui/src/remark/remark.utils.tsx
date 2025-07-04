import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';

type DirectiveNode = {
  name: string;
  attributes?: Record<string, string | null | undefined> | null;
  children?: unknown[];
};

export function parseDirective(markdown: string): DirectiveNode[] {
  const tree = unified().use(remarkParse).use(remarkDirective).parse(markdown);

  const results: DirectiveNode[] = [];

  visit(tree, (node) => {
    if (
      node.type === 'textDirective' ||
      node.type === 'leafDirective' ||
      node.type === 'containerDirective'
    ) {
      results.push({
        name: node.name,
        attributes: node.attributes,
        // children: node.children, // 不支持 children
      });
    }
  });

  return results;
}

export function stringifyDirective(directive: DirectiveNode): string {
  const attrs = directive.attributes
    ? Object.entries(directive.attributes)
        .filter(([_, v]) => v != null)
        .map(([k, v]) => (k === 'id' ? `#${v}` : `${k}="${v}"`))
        .join(' ')
    : '';

  return `::${directive.name}${attrs ? `{${attrs}}` : ''}`;
}

/**
 * 换成 http entity，在 html 不需要 decode（因为是 escape 而非 encode？）
 */
export function escapeForAttribute(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '&#10;'); // 换行
  // .replace(/\n/g, '\\n');  // 显示为 \n
}
