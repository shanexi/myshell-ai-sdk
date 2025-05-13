import { useRemarkable } from '@myshell-run/common-ui';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ExecutingMsgModel } from './executing-msg.model';
import { ReactComponent as Loading } from './loading.svg';
import { DEFAULT_AVATAR } from '@myshell-run/common-def';

// todo 增加一些动效 当从后端收到真实倒计时的时候（重置）做一个闪烁的效果 然后再更新值
export const ExecutingMsg = () => {
  // mobx 管理 估计需要注意下 map 管理（by message key）
  return (
    <div className="flex pb-8 pl-[8px]">
      <img
        className="mr-[8px] h-[32px] w-[32px] rounded-lg-v1"
        src={DEFAULT_AVATAR}
        alt={`other avatar`}
      />
      <div className="w-[80%]">
        <div className="rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] bg-surface-container-default-light-v1 p-4 text-text-default-light-v1">
          <XLoading>AI is generating.</XLoading>
          <Timer />
        </div>
      </div>
    </div>
  );
};

export const XLoading = (props: { children?: string } = {}) => {
  const { children } = props;
  return (
    <div className="flex items-center">
      <Loading className="me-2 animate-spin" />
      {children && (
        <span className="text-sm-regular text-text-subtle-light-v1">
          {children}
        </span>
      )}
    </div>
  );
};

export const Timer = observer((props: { id?: string; timeLeft?: string }) => {
  const model = useRemarkable(ExecutingMsgModel, props.id);
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
    <span className="text-sm-regular text-text-subtler-light-v1">
      {model.timeLeft > 0 && (
        <>
          It will take about{' '}
          <span className="text-sm-medium text-text-brand-light-v1">
            {model.displayTime}
          </span>
          .
        </>
      )}
    </span>
  );
});
