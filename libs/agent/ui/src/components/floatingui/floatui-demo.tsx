import { useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  FloatingDelayGroup,
  useDelayGroup,
} from '@floating-ui/react';

export const FloatUIDemo = () => {
  return (
    <FloatingDelayGroup delay={{ open: 1000, close: 200 }}>
      <div className="flex gap-2">
        <TooltipDemo />
        <TooltipDemo />
      </div>
    </FloatingDelayGroup>
  );
};

export const TooltipDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
    ],
  });

  const { delay } = useDelayGroup(context);

  const hover = useHover(context, { move: false, delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);

  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <div>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Hover or focus me
      </button>
      <FloatingPortal>
        {isOpen && (
          <div
            className="max-w-max scale-90 rounded-[4px] bg-[#444] px-[8px] py-[4px] text-white"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            I'm a tooltip!
          </div>
        )}
      </FloatingPortal>
    </div>
  );
};
