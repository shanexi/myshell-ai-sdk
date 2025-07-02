import { cn } from '@myshell-run/common-ui';

export const Button = () => {
  return (
    <button
      className={cn(
        'bg-Cr-Bg-normal-secondary-default-v2',
        'text-Cr-text-default-v2',
        'p-spacing-lg-v2',
      )}
    >
      Create
    </button>
  );
};
