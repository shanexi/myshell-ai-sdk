import { createRoute } from '../create-route';
import type { Meta } from './types';

export default createRoute(async (c) => {
  const name = c.req.query('name') ?? 'Hono';
  const posts = import.meta.glob<{ frontmatter: Meta }>('./posts/*.mdx', {
    eager: true,
  });
  return c.render(
    <div className="py-8 text-center">
      <title>{name}</title>
      <h1 className="text-3xl font-bold">Hello, {name}!</h1>
      <ul className="article-list">
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
