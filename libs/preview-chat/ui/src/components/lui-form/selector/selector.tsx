import { Select, SelectItem } from '@myshell-run/react-aria-tailwind-starter';
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
    <Select
      selectedKey={fieldProps.field.value}
      onSelectionChange={(value) => {
        fieldProps.form.setFieldValue(fieldProps.field.name, value);
      }}
    >
      {props.enum.map((item) => (
        <SelectItem key={item} id={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
};
