import { FieldProps } from 'formik';
import { z } from 'zod';

export const selector_schema = z.object({
  type: z.literal('string'),
  title: z.string(),
  enum: z.array(z.string()),
});

export const Selector: React.FC<
  z.infer<typeof selector_schema> & { fieldProps: FieldProps }
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
