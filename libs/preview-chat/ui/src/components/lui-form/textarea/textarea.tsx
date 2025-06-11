import { cn } from '@myshell-run/common-ui';
import { FieldProps } from 'formik';

export const Textarea: React.FC<FieldProps> = ({ field }) => {
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
        name={field.name}
        value={field.value}
        onChange={field.onChange}
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
        {field.value.length}/{maxLength}
      </div>
    </div>
  );
};
