import { reactRenderer } from '@hono/react-renderer';

export default reactRenderer(({ children }) => {
  return (
    <html lang="en" style={{ height: '100%', overflow: 'hidden' }}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;510;590&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {import.meta.env.PROD || import.meta.env.VITE_SSG === '1' ? (
          <>
            <script
              type="importmap"
              dangerouslySetInnerHTML={{
                __html: `
{
  "imports": {
    "react": "https://esm.sh/react",
    "react-dom/client": "https://esm.sh/react-dom/client",
    "mobx": "https://esm.sh/mobx",
    "mobx-react-lite": "https://esm.sh/mobx-react-lite",
    "react-markdown": "https://esm.sh/react-markdown",
    "remark-gfm": "https://esm.sh/remark-gfm",
    "inversify": "https://esm.sh/inversify@6.2.1",
    "reflect-metadata": "https://esm.sh/reflect-metadata",
    "tailwind-merge": "https://esm.sh/tailwind-merge"
  }
}
          `,
              }}
            ></script>
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
      <body style={{ height: '100%' }}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          const virtuosoList = document.querySelector('#x-chat-message-list > [data-testid="virtuoso-list"]');
          if (virtuosoList) {
            virtuosoList.scrollIntoView({ behavior: 'instant', block: 'end' });
          }
          `,
          }}
        ></script>
      </body>
    </html>
  );
});
