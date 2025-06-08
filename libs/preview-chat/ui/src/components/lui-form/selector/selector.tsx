import { z } from 'zod';

export const selector = z.object({
  type: z.literal('string'),
  enum: z.array(z.string()),
});

export const Selector = () => {
  return <div>Selector</div>;
};
