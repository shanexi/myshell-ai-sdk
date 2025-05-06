import '@myshell-run/tailwind-cfg/styles.css';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  BotInfo,
  ChatFoot,
  ChatInput,
  ChatMessageList,
  ChatRoot,
  ChatTopMenu,
  ChatTopRoot,
} from '@myshell-run/biz-ui';

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
        <ChatInput />
        <BotInfo
          bot={{
            id: 1,
            name: 'test',
            isOfficial: true,
            description: 'test',
            avatar: 'test',
          }}
        />
      </ChatFoot>
    </ChatRoot>
  </StrictMode>,
);
