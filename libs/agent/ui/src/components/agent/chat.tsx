import { cn } from '@myshell-run/ui-primitives';

export const Chat = () => {
  return (
    <div className={cn('px-2')}>
      <div
        className={cn(
          'flex',
          'bg-surface-primary-default-light dark:bg-surface-primary-default-dark',
          'text-text-default-light dark:text-text-default-dark',
        )}
      >
        Chat
      </div>
    </div>
  );
};
