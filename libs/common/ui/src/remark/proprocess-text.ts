function isHtmlTag(tag: string) {
  return /^(div|span|p|a|img|button|input|form|table|tr|td|th|ul|li|h[1-6])$/i.test(
    tag,
  );
}

export function preprocessText(keys: string[], text: string) {
  // First handle double colons that aren't already escaped
  text = text.replace(/(?<!\\)::(\w+)/g, (match, tag) => {
    return !isHtmlTag(tag) && keys.indexOf(tag) === -1 ? ':\\:' + tag : match;
  });

  // Then handle single colons that aren't already escaped
  return text.replace(/(?<!\\):([^:\s\\]+)/g, (match, tag) => {
    return !isHtmlTag(tag) && keys.indexOf(tag) === -1 ? '\\:' + tag : match;
  });
}
