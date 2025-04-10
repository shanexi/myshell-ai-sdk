import { cn } from '@myshell-run/ui-primitives';
import { useRef, useState } from 'react';
import { computeTextareaRows } from './chat-input.utils';

export const ChatInput: React.FC<{
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}> = ({ placeholder, value, onChange, className }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState(1);

  const adjustHeight = () => {
    if (!textareaRef.current || !parentRef.current) return;

    const { newRows, shouldScrollToBottom } = computeTextareaRows(
      textareaRef.current,
      parentRef.current,
    );

    setRows(newRows);

    // Scroll to bottom if content exceeds parent height
    if (shouldScrollToBottom) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  return (
    <div
      ref={parentRef}
      className={cn('relative h-full w-full overflow-hidden', className)}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          adjustHeight();
        }}
        placeholder={placeholder}
        rows={rows}
        className="box-border w-full resize-none overflow-auto focus:outline-none"
      />
    </div>
  );
};
