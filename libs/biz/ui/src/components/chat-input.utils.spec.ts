import { calculateTextareaRows } from './chat-input.utils';

describe('calculateTextareaRows', () => {
  // Mock implementation for HTMLElement with needed properties
  const createMockElement = (scrollHeight: number, lineHeight = '20px') => ({
    scrollHeight,
    clientHeight: 0,
    style: {},
    getComputedStyle: () => ({ lineHeight }),
  });

  beforeEach(() => {
    // Mock getComputedStyle
    window.getComputedStyle = jest.fn().mockImplementation((element) => {
      return {
        lineHeight: element.getComputedStyle
          ? element.getComputedStyle().lineHeight
          : '20px',
      };
    });
  });

  it('should return minimum 1 row when content is empty', () => {
    const textarea = createMockElement(0) as unknown as HTMLTextAreaElement;
    const parent = { clientHeight: 100 } as unknown as HTMLElement;

    const result = calculateTextareaRows(textarea, parent);

    expect(result.newRows).toBe(1);
    expect(result.shouldScrollToBottom).toBe(false);
  });

  it('should calculate rows based on content height', () => {
    const textarea = createMockElement(60) as unknown as HTMLTextAreaElement;
    const parent = { clientHeight: 100 } as unknown as HTMLElement;

    const result = calculateTextareaRows(textarea, parent);

    // Content needs 3 rows (60px / 20px), parent can fit 5 rows (100px / 20px)
    expect(result.newRows).toBe(3);
    expect(result.shouldScrollToBottom).toBe(false);
  });

  it('should limit rows to parent container height', () => {
    const textarea = createMockElement(120) as unknown as HTMLTextAreaElement;
    const parent = { clientHeight: 60 } as unknown as HTMLElement;

    const result = calculateTextareaRows(textarea, parent);

    // Content needs 6 rows (120px / 20px), but parent can only fit 3 rows (60px / 20px)
    expect(result.newRows).toBe(3);
    expect(result.shouldScrollToBottom).toBe(true);
  });

  it('should handle custom line height', () => {
    const textarea = createMockElement(
      90,
      '30px',
    ) as unknown as HTMLTextAreaElement;
    const parent = { clientHeight: 120 } as unknown as HTMLElement;

    // Override the mock for this specific it
    window.getComputedStyle = jest.fn().mockReturnValue({ lineHeight: '30px' });

    const result = calculateTextareaRows(textarea, parent);

    // Content needs 3 rows (90px / 30px), parent can fit 4 rows (120px / 30px)
    expect(result.newRows).toBe(3);
    expect(result.shouldScrollToBottom).toBe(false);
  });

  it('should handle invalid line height and use default', () => {
    const textarea = createMockElement(
      80,
      'invalid',
    ) as unknown as HTMLTextAreaElement;
    const parent = { clientHeight: 100 } as unknown as HTMLElement;

    // Override the mock for this specific it
    window.getComputedStyle = jest
      .fn()
      .mockReturnValue({ lineHeight: 'invalid' });

    const result = calculateTextareaRows(textarea, parent);

    // Using default lineHeight of 20px
    // Content needs 4 rows (80px / 20px), parent can fit 5 rows (100px / 20px)
    expect(result.newRows).toBe(4);
    expect(result.shouldScrollToBottom).toBe(false);
  });
});
