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

// AI 生成
export function fuzzyMatch(
  text: string,
  search: string,
): { highlighted: Array<{ char: string; isMatch: boolean }>; score: number } {
  const searchLower = search.toLowerCase();
  const textLower = text.toLowerCase();

  let searchIndex = 0;
  let score = 0;
  const highlighted: Array<{ char: string; isMatch: boolean }> = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charLower = textLower[i];

    if (
      searchIndex < searchLower.length &&
      charLower === searchLower[searchIndex]
    ) {
      highlighted.push({ char, isMatch: true });
      searchIndex++;
      // Give higher score for consecutive matches
      score += searchIndex === 1 ? 10 : 5;
      // Bonus for matches at word boundaries
      if (i === 0 || text[i - 1] === ' ' || text[i - 1] === '.') {
        score += 5;
      }
    } else {
      highlighted.push({ char, isMatch: false });
    }
  }

  // Only return matches if all search characters were found
  if (searchIndex === searchLower.length) {
    // Bonus for shorter strings (better matches)
    score += Math.max(0, 50 - text.length);
    return { highlighted, score };
  }

  return { highlighted: [], score: 0 };
}
