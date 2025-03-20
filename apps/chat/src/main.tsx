import '@myshell-run/tailwind-cfg/styles.css';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  BotInfo,
  ChatFoot,
  ChatInputRoot,
  ChatMessageList,
  ChatRoot,
  ChatTopMenu,
  ChatTopRoot,
} from '@myshell-run/ui-biz';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <ChatRoot>
      <ChatTopRoot>
        <ChatTopMenu />
      </ChatTopRoot>
      <ChatMessageList className="flex flex-grow flex-col overflow-auto px-[8px]" />
      <ChatFoot>
        <ChatInputRoot />
        <BotInfo />
      </ChatFoot>
    </ChatRoot>
  </StrictMode>,
);
