import htmlTags from 'html-tags';

export function escapeNotDirective(keys: string[], text: string) {
  return text.replace(/(?<!\\):([a-zA-Z0-9\-_]+)/g, (match, tag) => {
    return htmlTags.indexOf(tag) === -1 && keys.indexOf(tag) === -1
      ? '\\:' + tag
      : match;
  });
}
