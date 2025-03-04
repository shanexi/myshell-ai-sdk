import { BotInfo } from './bot-info';
import { ChatInput } from './chat-input';
import { ChatMessageList } from './chat-message-list';
import { ChatTop } from './chat-top';

// XSS 演示组件
const XssDemo = () => {
  // 危险的 HTML 内容 - 仅用于演示目的
  const dangerousHtml = "<img src='x' onerror='alert(\"XSS 演示!\")' />";

  return (
    <div className="p-2 mb-2 border border-red-500 rounded">
      <p className="text-red-500 font-bold mb-1">XSS 演示 (不安全):</p>
      <div dangerouslySetInnerHTML={{ __html: dangerousHtml }} />
      <p className="text-xs text-gray-500 mt-1">
        这是一个不安全的演示，请勿在生产环境中使用
      </p>
    </div>
  );
};

export function Chat() {
  return (
    <div className="flex h-screen flex-col bg-surface-container-default-light">
      <div className="flex-none">
        <ChatTop />
      </div>
      <div className="flex-grow overflow-auto px-[8px]">
        <ChatMessageList />
      </div>
      <div className="mb-[34px] flex-none border-t-[0.5px] border-border-default-light">
        <XssDemo />
        <ChatInput />
        <BotInfo />
      </div>
    </div>
  );
}
