import { FieldProps } from 'formik';
import { z } from 'zod';

export const select_schema = z.object({
  type: z.literal('string'),
  title: z.string(),
  enum: z.array(z.string()),
});

export const Select: React.FC<
  z.infer<typeof select_schema> & { fieldProps: FieldProps }
> = ({ fieldProps, ...props }) => {
  return (
    <select
      value={fieldProps.field.value}
      className="select w-full"
      onChange={(e) => {
        fieldProps.form.setFieldValue(fieldProps.field.name, e.target.value);
      }}
    >
      {/* <option disabled={true}>{props.title}</option> */}
      {props.enum.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
