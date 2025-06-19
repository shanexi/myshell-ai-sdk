import { string_schema } from '@myshell-run/common-def';
import { FieldProps } from 'formik';
import { z } from 'zod';

export const select_schema = string_schema.extend({
  enum: z.array(z.string()),
});

export const Select: React.FC<
  z.infer<typeof select_schema> & { fieldProps: FieldProps }
> = ({ fieldProps, ...props }) => {
  return (
    <select
      {...fieldProps.field}
      className="select w-full"
      onChange={(e) => {
        fieldProps.form.setFieldValue(fieldProps.field.name, e.target.value);
      }}
    >
      <option disabled={true}>{props.description}</option>
      {props.enum.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
