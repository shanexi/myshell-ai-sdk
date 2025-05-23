import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { cn } from '@myshell-run/common-ui';
import { useState } from 'react';

export const FloatUIPopoverDemo = () => {
  return (
    <div>
      <PopoverDemo />
    </div>
  );
};
export const PopoverDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    placement: 'right',
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context); // 区别 tooltip useHover/useFocus
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div>
      <button ref={refs.setReference} {...getReferenceProps()}>
        My Trigger
      </button>
      <FloatingPortal>
        {isOpen && (
          <FloatingFocusManager context={context}>
            <div
              className={cn(
                'bg-white',
                'shadow-md',
                'border border-gray-300',
                'text-sm',
                'px-2 py-1',
                'rounded',
                'box-border',
                'max-w-max',
              )}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              Popover element
              <button className="btn" onClick={() => setIsOpen(false)}>
                close
              </button>
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </div>
  );
};
