import { cn } from '@myshell-run/common-ui';
import { useState } from 'react';

export const Textarea = () => {
  const [value, setValue] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  );
  const maxLength = 300;
  return (
    <div
      className={cn(
        'flex flex-col gap-spacing-md-v2',
        'w-full',
        'bg-CCr-input-bg_default-light-v2',
        'rounded-C-input-radius-v2',
        'p-spacing-lg-v2',
      )}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          'resize-none',
          'focus-within:ring-0 focus-within:outline-none focus:ring-0 focus:outline-none',
        )}
        placeholder="Bio"
        maxLength={maxLength}
      ></textarea>
      <div
        className={cn(
          'text-Cr-text-subtlest-light-v2',
          'description-lg-regular',
          'text-right',
        )}
      >
        {value.length}/{maxLength}
      </div>
    </div>
  );
};
