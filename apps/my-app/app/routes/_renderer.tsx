import { reactRenderer } from '@hono/react-renderer';

export default reactRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <body>
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
