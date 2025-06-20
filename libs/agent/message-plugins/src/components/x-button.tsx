import { cn, useRemarkable } from '@myshell-run/common-ui';
import { observer } from 'mobx-react-lite';
import { XButtonModel } from './x-button.model';
import { PropsWithChildren, useEffect } from 'react';
import { Properties } from 'hastscript';

export const XButton = observer<PropsWithChildren<Properties>>(
  ({ children, ...props }) => {
    let model: XButtonModel | null = null;
    if (typeof props.id === 'string') {
      model = useRemarkable(XButtonModel, props.id);
    }
    useEffect(() => {
      console.log('only run once');
      if (model) {
        model.onUpdate(props);
      }
    }, []);
    return (
      <span
        className={cn(
          'text-sm-medium',
          'h-[36px]',
          'border border-CCr-button-tertiary-border-light-v2',
          'bg-CCr-button-tertiary-bg_default-light-v2',
          'rounded-C-button-md-radius-v2',
          'px-C-button-md-padding-v2',
          'py-1',
          'cursor-pointer',
        )}
      >
        {(model && model.display_text) ||
          (props.display_text as string) ||
          children}
      </span>
    );
  },
);
