/**
 * 计算文本区域应该显示的行数
 */
export function calculateTextareaRows(
  textarea: HTMLTextAreaElement,
  parent: HTMLElement,
): { newRows: number; shouldScrollToBottom: boolean } {
  const textareaScrollHeight = textarea.scrollHeight;
  const parentHeight = parent.clientHeight;
  const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;

  // 计算父容器中能容纳的最大行数
  const maxRows = Math.floor(parentHeight / lineHeight);

  // 计算内容需要的行数
  const contentRows = Math.ceil(textareaScrollHeight / lineHeight);

  // 设置为内容行数和最大行数中的较小值
  const newRows = Math.min(contentRows, maxRows);

  return {
    newRows: Math.max(1, newRows),
    shouldScrollToBottom: contentRows > maxRows,
  };
}
