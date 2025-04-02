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

export const Timer = observer((props: { timeLeft?: string }) => {
  const model = useInjection(ExecutingMsgModel);
  useEffect(() => {
    console.log('only run once');
    const timeLeftNum = Number(props.timeLeft);
    model.setTimeLeft(timeLeftNum);
    const timer = setInterval(() => {
      if (model.timeLeft <= 0) {
        clearInterval(timer);
      } else {
        model.decreaseTimeLeft();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="text-sm-regular text-text-subtler-light">
      {model.timeLeft > 0 && (
        <>
          It will take about{' '}
          <span className="text-sm-medium text-text-brand-light">
            {model.displayTime}
          </span>
          .
        </>
      )}
    </span>
  );
});
