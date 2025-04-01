import { ReactComponent as Loading } from './loading.svg';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useInjection } from '@myshell-run/ui-primitives';
import { ExecutingMsgModel } from './executing-msg.model';
import { Message } from '@myshell-run/biz-def';
import { ReplyMsgFrame } from '@myshell-run/ui-primitives';

// todo 增加一些动效 当从后端收到真实倒计时的时候（重置）做一个闪烁的效果 然后再更新值
export const ExecutingMsg = observer((props: Message) => {
  // mobx 管理 估计需要注意下 map 管理（by message key）
  const model = useInjection(ExecutingMsgModel);

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
    <ReplyMsgFrame>
      <XLoading>AI is generating.</XLoading>
      <span className="text-sm-regular text-text-subtler-light">
        It will take about{' '}
        <span className="text-sm-medium text-text-brand-light">
          {minutes > 0 ? `${minutes} min ` : ''}
          {seconds} sec
        </span>
        .
      </span>
    </ReplyMsgFrame>
  );
});

export const XLoading = (props: { children?: string } = {}) => {
  const { children } = props;
  return (
    <div className="flex items-center">
      <Loading className="me-2 animate-spin" />
      {children && (
        <span className="text-sm-regular text-text-subtle-light">
          {children}
        </span>
      )}
    </div>
  );
};
