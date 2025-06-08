import Masonry from 'react-masonry-css';
import { z } from 'zod';

export const image_choice = z.object({
  type: z.literal('object'),
  title: z.string(),
  variant: z.string(),
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

export const ImageChoice = () => {
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
        {items.map((item) => (
          <div key={item.alt} className="relative bg-transparent">
            <img
              alt={item.alt}
              src={item.img}
              className="w-full rounded-lg-v1"
            />
            <div className="absolute right-0 bottom-0 left-0 flex justify-center rounded-br-lg-v1 rounded-bl-lg-v1 bg-gradient-to-b from-transparent to-black px-[12px] pt-[20px] pb-[12px] text-text-static-white-light-v1">
              {item.alt}
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

const items: { img: string; alt: string }[] = [
  {
    img: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    alt: '1',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
    alt: '2',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
    alt: '3',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
    alt: '4',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
    alt: '5',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg',
    alt: '6',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg',
    alt: '7',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg',
    alt: '8',
  },
];
