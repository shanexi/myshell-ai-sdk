import { match, P } from 'ts-pattern';

describe('ts-pattern', () => {
  it('should be defined', () => {
    type Response =
      | { type: 'video'; data: { format: 'mp4' | 'webm'; src: string } }
      | {
          type: 'image';
          data: { extension: 'gif' | 'jpg' | 'png'; src: string };
        }
      | { type: 'text'; data: string; tags: { name: string; id: number }[] };

    const example1 = (input: Response): string =>
      match(input)
        // 1. Basic pattern with inference with a wildcard
        .with(
          { type: 'video', data: { format: 'mp4' } },
          (video) => video.data.src,
        )
        // 2. using select
        .with(
          { type: 'image', data: { extension: 'gif', src: P.select() } },
          (src) => `<img src=${src} alt="This is a gif!" />`,
        )
        // 3. using P.union
        .with(
          {
            type: 'image',
            data: { extension: P.union('jpg', 'png'), src: P.select() },
          },
          (src) => `<img src=${src} alt="This is a jpg or a png!" />`,
        )
        // 4. selecting all tag names with P.array and P.select
        .with(
          { type: 'text', tags: P.array({ name: P.select() }) },
          (tagNames) => `text with tags: ${tagNames.join(', ')}`,
        )
        // 5. basic exhaustiveness checking
        // ⚠️ doesn't type-check!
        // @ts-expect-error: { type: 'video', data: { format: 'webm' } } isn't covered
        .exhaustive();

    example1({
      type: 'video',
      data: { format: 'mp4', src: 'https://example.com/video.mp4' },
    });
  });
});
