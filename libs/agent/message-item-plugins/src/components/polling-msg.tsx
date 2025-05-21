import { cn, useRemarkable } from '@myshell-run/common-ui';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { PollingMsgModel } from './polling-msg.model';

export const PollingMsg = observer(
  (props: { id?: string; timeLeft?: string }) => {
    const model = useRemarkable(PollingMsgModel, props.id);
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
      <span
        className={cn(
          'px-spacing-xl-v2 py-spacing-lg-v2',
          'text-sm-medium text-Cr-text-default-light-v2',
        )}
      >
        {model.timeLeft > 0 ? (
          <>
            Will get response in{' '}
            <span className="text-Cr-text-brand-default-light-v2">
              {model.displayTime}
            </span>
            .
          </>
        ) : (
          <div className="loader"></div>
        )}
      </span>
    );
  },
);
