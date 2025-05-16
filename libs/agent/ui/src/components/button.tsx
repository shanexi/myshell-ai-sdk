import { cn } from '@myshell-run/common-ui';

export const Button = () => {
  return (
    <button
      className={cn(
        'bg-Cr-Bg-normal-secondary-default-light-v2 dark:bg-Cr-Bg-normal-secondary-default-dark-v2',
        'text-Cr-text-default-light-v2 dark:text-Cr-text-default-dark-v2',
        'p-spacing-lg-v2',
      )}
    >
      Create
    </button>
  );
};
