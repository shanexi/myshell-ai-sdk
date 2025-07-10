import { cn } from '@myshell-run/common-ui';
import { ChatLandingInput } from './chat-landing-input';

export const ChatLanding = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-Cr-Bg-normal-primary-default-v2">
      <div
        className={cn(
          'flex flex-[0_0_640px] flex-col gap-[24px]',
          '-translate-y-1/4', // 手动微调
        )}
      >
        <div
          className={cn('text-Cr-text-default-v2', 'display-lg text-center')}
        >
          What would you like to create today?
        </div>
        <ChatLandingInput />
      </div>
    </div>
  );
};
