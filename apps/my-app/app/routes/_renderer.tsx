import { reactRenderer } from '@hono/react-renderer';

export default reactRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.VITE_SSG === '1' ? (
          <>
            <script
              crossOrigin="anonymous"
              src="https://unpkg.com/react@18/umd/react.development.js"
            ></script>
            <script
              crossOrigin="anonymous"
              src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
            ></script>
            <script src="/static/js/client.js"></script>
            <link href="/static/css/style.css" rel="stylesheet" />
          </>
        ) : import.meta.env.PROD ? (
          <>
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script type="module" src="/static/client.js"></script>
            <link href="/static/assets/style.css" rel="stylesheet" />
          </>
        ) : (
          <>
            <script type="module" src="/app/client.ts"></script>
            <link href="/app/style.css" rel="stylesheet" />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
});
