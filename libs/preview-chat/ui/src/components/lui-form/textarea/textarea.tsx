import { string_schema } from '@myshell-run/common-def';
import { cn } from '@myshell-run/common-ui';
import { type FieldProps } from 'formik';
import { z } from 'zod';

export const Textarea: React.FC<
  z.infer<typeof string_schema> & { fieldProps: FieldProps }
> = ({ fieldProps, ...props }) => {
  const { field } = fieldProps;
  const maxLength = props.maxLength;
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
        {...field}
        className={cn(
          'resize-none',
          'focus-within:ring-0 focus-within:outline-none focus:ring-0 focus:outline-none',
        )}
        placeholder={props.description}
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
