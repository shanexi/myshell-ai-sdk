import { computeTextareaRows } from './chat-input.utils';

describe('calculateTextareaRows', () => {
  let textarea: HTMLTextAreaElement;
  let parent: HTMLElement;

  beforeEach(() => {
    // 创建测试用的 DOM 元素
    textarea = document.createElement('textarea');
    parent = document.createElement('div');

    // 设置基本样式
    Object.defineProperty(textarea.style, 'lineHeight', { value: '20px' });

    // Mock 一些只读属性
    jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => 100);
    jest.spyOn(textarea, 'clientHeight', 'get').mockImplementation(() => 60);
    jest.spyOn(textarea, 'scrollTop', 'get').mockImplementation(() => 0);
    jest.spyOn(parent, 'clientHeight', 'get').mockImplementation(() => 60);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('shouldScrollToBottom calculation', () => {
    it('should return true when content exceeds maxRows and viewport is at bottom', () => {
      // 设置内容超出显示范围且视图在底部
      jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => 100);
      jest.spyOn(textarea, 'clientHeight', 'get').mockImplementation(() => 60);
      jest.spyOn(textarea, 'scrollTop', 'get').mockImplementation(() => 40); // scrollTop + clientHeight = scrollHeight

      const result = computeTextareaRows(textarea, parent);
      expect(result.shouldScrollToBottom).toBe(true);
    });

    it('should return false when content exceeds maxRows but viewport is not at bottom', () => {
      // 设置内容超出显示范围但视图不在底部
      jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => 100);
      jest.spyOn(textarea, 'clientHeight', 'get').mockImplementation(() => 60);
      jest.spyOn(textarea, 'scrollTop', 'get').mockImplementation(() => 20); // 在中间位置

      const result = computeTextareaRows(textarea, parent);
      expect(result.shouldScrollToBottom).toBe(false);
    });

    it('should return false when content does not exceed maxRows', () => {
      // 设置内容不超出显示范围
      jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => 40);
      jest.spyOn(textarea, 'clientHeight', 'get').mockImplementation(() => 60);
      jest.spyOn(textarea, 'scrollTop', 'get').mockImplementation(() => 0);

      const result = computeTextareaRows(textarea, parent);
      expect(result.shouldScrollToBottom).toBe(false);
    });

    it('should handle edge case with small scroll difference', () => {
      // 测试接近底部但有小误差的情况
      jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => 100);
      jest.spyOn(textarea, 'clientHeight', 'get').mockImplementation(() => 60);
      jest.spyOn(textarea, 'scrollTop', 'get').mockImplementation(() => 38); // 差值小于 10px

      const result = computeTextareaRows(textarea, parent);
      expect(result.shouldScrollToBottom).toBe(true);
    });
  });

  describe('newRows calculation', () => {
    it('should calculate correct number of rows', () => {
      jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => 80);
      jest.spyOn(parent, 'clientHeight', 'get').mockImplementation(() => 60);

      const result = computeTextareaRows(textarea, parent);
      expect(result.newRows).toBe(3); // 80px / 20px(lineHeight) = 4 rows, but maxRows is 3
    });

    it('should return at least 1 row', () => {
      jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => 0);
      jest.spyOn(parent, 'clientHeight', 'get').mockImplementation(() => 60);

      const result = computeTextareaRows(textarea, parent);
      expect(result.newRows).toBe(1);
    });
  });
});
