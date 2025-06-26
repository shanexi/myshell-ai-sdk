import { cn } from '@myshell-run/common-ui';

export const Progress: React.FC<{ text: string; progress: number }> = ({
  text,
  progress,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-[8px]',
        'bg-Cr-Bg-normal-secondary-alt-light-v2',
        'border border-Cr-border-default-light-v2',
        'p-spacing-lg-v2',
        'rounded-md-v2',
      )}
    >
      {text}
      <progress
        className="progress h-[6px] w-full progress-neutral"
        value={progress}
        max="100"
      ></progress>
    </div>
  );
};
