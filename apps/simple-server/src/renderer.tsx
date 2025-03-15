import { jsxRenderer } from 'hono/jsx-renderer';

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
});
