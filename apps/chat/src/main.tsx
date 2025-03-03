import '@myshell-run/ui/src/styles.css';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/chat';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
