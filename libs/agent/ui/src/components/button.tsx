import { cn } from '@myshell-run/common-ui';

export const Button = () => {
  return (
    <button
      className={cn(
        'bg-colors-background-normal-secondary-default-light-v2 dark:bg-colors-background-normal-secondary-default-dark-v2',
        'text-colors-text-default-light-v2 dark:text-colors-text-default-dark-v2',
        'p-spacing-lg-v2',
      )}
    >
      Create
    </button>
  );
};
