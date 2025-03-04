import { BotInfo } from './bot-info';
import { ChatInput } from './chat-input';
import { ChatMessageList } from './chat-message-list';
import { ChatTop } from './chat-top';
import { useState } from 'react';

export function Chat() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 危险：直接将用户输入添加到消息列表中，没有任何净化
    setMessages([...messages, userInput]);
    setUserInput('');
  };

  return (
    <div className="flex h-screen flex-col bg-surface-container-default-light">
      <div className="flex-none">
        <ChatTop />
      </div>
      <div className="flex-grow overflow-auto px-[8px]">
        <ChatMessageList />
        {/* 危险：直接使用 dangerouslySetInnerHTML 渲染用户输入 */}
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: msg }}
              className="message"
            />
          ))}
        </div>
      </div>
      <div className="mb-[34px] flex-none border-t-[0.5px] border-border-default-light">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="输入消息..."
          />
          <button type="submit">发送</button>
        </form>
        <ChatInput />
        <BotInfo />
      </div>
    </div>
  );
}
