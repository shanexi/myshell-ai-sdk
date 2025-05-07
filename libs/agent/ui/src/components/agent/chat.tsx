import { cn } from '@myshell-run/ui-primitives';

export const Chat = () => {
  return (
    <div className={cn('px-2')}>
      <div
        className={cn(
          'flex',
          'bg-surface-primary-default-light-v1 dark:bg-surface-primary-default-dark-v1',
          'text-text-default-light-v1 dark:text-text-default-dark-v1',
        )}
      >
        Chat
      </div>
    </div>
  );
};
