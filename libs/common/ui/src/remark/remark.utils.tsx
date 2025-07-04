import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

export function parseDirective(markdown: string) {
  const tree = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkGfm)
    .parse(markdown);

  return tree;
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
