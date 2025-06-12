import htmlTags from 'html-tags';

/**
 * @description 这个处理并不好，最好的方式应该是在 AST 阶段再操作
 */
export function escapeNotDirective(keys: string[], text: string) {
  return text.replace(/(?<!\\):([a-zA-Z0-9\-_]+)/g, (match, tag) => {
    return htmlTags.indexOf(tag) === -1 && keys.indexOf(tag) === -1
      ? '\\:' + tag
      : match;
  });
}
