import { useRemarkable } from '@myshell-run/common-ui';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { TimerModel } from './timer.model';
import { ReactComponent as Loading } from './loading.svg';

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
  const model = useRemarkable(TimerModel, props.id);
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
