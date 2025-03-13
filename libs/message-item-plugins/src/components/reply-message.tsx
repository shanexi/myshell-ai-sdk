import { Message } from '@myshell-run/def';
import { ReactComponent as Loading } from './loading.svg';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';
import { ExecutingMessageModel } from './executing-message-model';
import { ReplyMessageFrame } from '@myshell-run/ui-primitives';

// todo 增加一些动效 当从后端收到真实倒计时的时候（重置）做一个闪烁的效果 然后再更新值
export const ExecutingMessage = observer((props: Message) => {
  // mobx 管理 估计需要注意下 map 管理（by message key）
  const model = useInjection(ExecutingMessageModel);

  useEffect(() => {
    if (model.timeLeft <= 0) return;

    const timer = setInterval(() => {
      model.timeLeft--;
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const minutes = Math.floor(model.timeLeft / 60);
  const seconds = model.timeLeft % 60;

  return (
    <ReplyMessageFrame>
      <div className="flex items-center">
        <Loading className="me-2 animate-spin" />
        <span className="text-sm-regular text-text-subtle-light">
          AI is generating.
        </span>
      </div>
      <span className="text-sm-regular text-text-subtler-light">
        It will take about{' '}
        <span className="text-sm-medium text-text-brand-light">
          {minutes > 0 ? `${minutes} min ` : ''}
          {seconds} sec
        </span>
        .
      </span>
    </ReplyMessageFrame>
  );
});

export const ReplyMessage = (props: Message) => {
  return (
    <ReplyMessageFrame
      button={
        // button 布局收敛
        <div className="-mx-spacing-xs flex justify-between">
          <LuiButton>🪄 Upscale (Subtle)</LuiButton>
          <LuiButton>💥 Upscale (Creative)</LuiButton>
        </div>
      }
    >
      {props.text}
    </ReplyMessageFrame>
  );
};

export const LuiButton = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <button className="text-sm-medium mx-spacing-xs h-components-button-lg-height border-border-default-light bg-surface-default-light p-spacing-lg flex flex-auto items-center justify-center rounded-lg border">
      {children}
    </button>
  );
};
