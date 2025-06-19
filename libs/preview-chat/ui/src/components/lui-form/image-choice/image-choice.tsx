import { object_schema } from '@myshell-run/common-def';
import { FieldProps } from 'formik';
import Masonry from 'react-masonry-css';
import { z } from 'zod';

export const image_choice_schema = object_schema.extend({
  properties: z.object({
    url: z.object({
      type: z.literal('string'),
    }),
    title: z.object({
      type: z.literal('string'),
    }),
    name: z.object({
      type: z.literal('string'),
    }),
  }),
  examples: z.array(
    z.object({
      url: z.string(),
      title: z.string(),
      name: z.string(),
    }),
  ),
});

export const ImageChoice: React.FC<
  z.infer<typeof image_choice_schema> & { fieldProps: FieldProps }
> = ({ fieldProps, ...props }) => {
  return (
    <div className="max-h-[300px] overflow-y-scroll rounded-lg-v1 border border-border-default-light-v1 bg-surface-default-light-v1 px-spacing-lg-v1 py-spacing-md-v1">
      <Masonry
        breakpointCols={{
          default: 5,
          1112: 5,
          896: 3,
          568: 2,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {props.examples.map((item) => (
          <div key={item.name} className="relative bg-transparent">
            <img
              alt={item.title}
              src={item.url}
              className="w-full rounded-lg-v1"
            />
            <div className="absolute right-0 bottom-0 left-0 flex justify-center rounded-br-lg-v1 rounded-bl-lg-v1 bg-gradient-to-b from-transparent to-black px-[12px] pt-[20px] pb-[12px] text-text-static-white-light-v1">
              {item.title}
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};
