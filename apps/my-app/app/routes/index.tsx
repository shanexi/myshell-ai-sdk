import { createRoute } from 'honox/factory';
import Counter from '../islands/counter';
import type { Meta } from './types';

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono';
  const posts = import.meta.glob<{ frontmatter: Meta }>('./posts/*.mdx', {
    eager: true,
  });
  return c.render(
    <div class="py-8 text-center">
      <title>{name}</title>
      <h1 class="text-3xl font-bold">Hello, {name}!</h1>
      <Counter />
      <ul class="article-list">
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <li>
                <a href={`${id.replace(/\.mdx$/, '')}`}>
                  {module.frontmatter.title}
                </a>
              </li>
            );
          }
        })}
      </ul>
    </div>,
  );
});
