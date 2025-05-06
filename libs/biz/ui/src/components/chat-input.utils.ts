/**
 * 计算文本区域应该显示的行数
 */
export function computeTextareaRows(
  textarea: HTMLTextAreaElement,
  parent: HTMLElement,
): { newRows: number; shouldScrollToBottom: boolean } {
  const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;

  // 计算父容器中能容纳的最大行数
  const maxRows = Math.floor(parent.clientHeight / lineHeight);

  // 计算内容需要的行数
  const contentRows = Math.ceil(textarea.scrollHeight / lineHeight);

  // 检查是否在底部附近（允许一定的误差范围）
  const isNearBottom =
    Math.abs(
      textarea.scrollTop + textarea.clientHeight - textarea.scrollHeight,
    ) < 10;

  // 设置为内容行数和最大行数中的较小值
  const newRows = Math.min(contentRows, maxRows);

  return {
    newRows: Math.max(1, newRows),
    shouldScrollToBottom: contentRows > maxRows && isNearBottom,
  };
}
