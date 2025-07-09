import { cn } from '@myshell-run/common-ui';
import { ChatLandingInput } from './chat-landing-input';

export const ChatLanding = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={cn(
          'absolute left-1/2 flex w-[90%] -translate-x-1/2 flex-col gap-[24px] sm:w-[440px] md:w-[560px] lg:w-[640px] xl:w-[720px]',
          '-translate-y-1/4',
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
