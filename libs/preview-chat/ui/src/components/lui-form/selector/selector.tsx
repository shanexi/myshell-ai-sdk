import { Select, SelectItem } from '@myshell-run/react-aria-tailwind-starter';
import { z } from 'zod';

export const selector = z.object({
  type: z.literal('string'),
  enum: z.array(z.string()),
});

export const Selector = () => {
  return (
    <Select
      selectedKey="mint"
      onSelectionChange={(value) => {
        console.log(value);
      }}
    >
      <SelectItem>Chocolate</SelectItem>
      <SelectItem id="mint">Mint</SelectItem>
      <SelectItem>Strawberry</SelectItem>
      <SelectItem>Vanilla</SelectItem>
    </Select>
  );
};
