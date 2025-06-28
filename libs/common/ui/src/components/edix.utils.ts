import { Position } from 'edix';
import { ChatInputDoc } from './edix.model';

export type AtSearchCriteria = {
  char: string;
  criteria: string;
} | null;
/**
 * 计算出当前用户 @ 后面的 criteira
 */
export function getAtSearchCriteria(
  chatInputDoc: ChatInputDoc,
  selection?: [anchor: Position, focus: Position],
): AtSearchCriteria {
  if (!selection) return null;

  const anchor = selection[0];
  const line = chatInputDoc[anchor[0]];

  const text = line
    .map((i) => {
      if (i.type === 'text') {
        return i.text;
      } else {
        return '©'; // context 占位，占用一个 position
      }
    })
    .join('');
  // 如果敲击了空格 return null
  const char = text[anchor[1] - 1];
  if (text[anchor[1] - 1] === ' ') return null;
  const start = text.lastIndexOf('@', anchor[1] - 1);
  // 如果 @@ 相邻，则返回 null
  if (text[start - 1] === '@') {
    return null;
  }
  const end = text.indexOf(' ', anchor[1]);
  const criteria = text.slice(start + 1, end === -1 ? undefined : end);

  return {
    char,
    criteria,
  };
}
