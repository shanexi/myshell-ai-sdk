import { number_schema } from '@myshell-run/common-def';
import { FieldProps } from 'formik';
import { z } from 'zod';

export const Range: React.FC<
  z.infer<typeof number_schema> & { fieldProps: FieldProps }
> = ({ fieldProps, ...props }) => {
  const { field } = fieldProps;
  return (
    <input
      {...field}
      type="range"
      min={props.minimum}
      max={props.maximum}
      className="range"
    />
  );
};
