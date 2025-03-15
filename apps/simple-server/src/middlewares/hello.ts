import { createMiddleware } from 'hono/factory';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss-3';
import autoprefixer from 'autoprefixer';
// import { JSDOM } from 'jsdom';

export const hello = (message = 'Hello!') => {
  return createMiddleware(async (c, next) => {
    await next();

    const t0 = performance.now();
    const inputHtml = await c.res.clone().text();
    const inputCss = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;

    const result = await postcss([
      tailwindcss({
        content: [{ raw: inputHtml }],
        theme: {
          extend: {},
        },
        plugins: [],
      }),
      autoprefixer,
    ]).process(inputCss, { from: undefined });
    const t2 = performance.now();
    console.log(`[tw] ${t2 - t0}ms`);
    const processedCss = result.css;
    c.res.headers.append('X-Message', message);
  });
};
