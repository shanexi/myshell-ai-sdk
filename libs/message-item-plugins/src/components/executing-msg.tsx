import { ReplyMsgFrame, useInjection } from '@myshell-run/ui-primitives';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { ExecutingMsgModel } from './executing-msg.model';
import { ReactComponent as Loading } from './loading.svg';

// todo 增加一些动效 当从后端收到真实倒计时的时候（重置）做一个闪烁的效果 然后再更新值
export const ExecutingMsg = () => {
  // mobx 管理 估计需要注意下 map 管理（by message key）
  return (
    <ReplyMsgFrame>
      <XLoading>AI is generating.</XLoading>
      <Timer />
    </ReplyMsgFrame>
  );
};

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

export const Timer = (props: { timeLeft?: string }) => {
  if (isNaN(Number(props.timeLeft))) {
    throw new Error('timeLeft must be a number');
  }
  const timeLeftNum = Number(props.timeLeft);
  const [timeLeft, setTimeLeft] = useState(timeLeftNum);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft <= 0) {
          clearInterval(timer);
          return 0;
        } else {
          return timeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const displayTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
  }, [timeLeft]);

  return (
    <span className="text-sm-regular text-text-subtler-light">
      {timeLeft > 0 && (
        <>
          It will take about{' '}
          <span className="text-sm-medium text-text-brand-light">
            {displayTime}
          </span>
          .
        </>
      )}
    </span>
  );
};
