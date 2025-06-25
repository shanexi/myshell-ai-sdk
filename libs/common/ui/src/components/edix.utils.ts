import { Position } from 'edix';
import { ChatInputDoc } from './edix.model';

/**
 * 计算出当前用户 @ 后面的 criteira
 */
export function getAtSearchCriteria(
  chatInputDoc: ChatInputDoc,
  selection?: [anchor: Position, focus: Position],
) {
  if (!selection) return null;

  const anchor = selection[0];
  const line = chatInputDoc[anchor[0]];

  const text = line
    .map((i) => {
      if (i.type === 'text') {
        return i.text;
      } else {
        return '©'; // context 占位，在 anchor
      }
    })
    .join('');
  // 空格 return null
  if (text[anchor[1] - 1] === ' ') return null;
  const start = text.lastIndexOf('@', anchor[1] - 1);
  // 如果 @@ 相邻，则返回 null
  if (text[start - 1] === '@') {
    return null;
  }
  const end = text.indexOf(' ', anchor[1]);
  const criteria = text.slice(start + 1, end === -1 ? undefined : end);
  return criteria;
}
