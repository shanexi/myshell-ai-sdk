import { cn } from '../utils';

export const LuiForm = () => {
  return (
    <div>
      <LuiFormHeader />
      <div>Form body</div>
      <LuiFormFooter />
    </div>
  );
};

export const LuiFormHeader = () => {
  return (
    <div className="flex justify-center rounded-tl-2xl rounded-tr-2xl border-b border-b-border-default-light bg-surface-default-light px-spacing-3xl py-spacing-lg">
      <div className="display-sm-semibold pt-spacing-md">
        Image Configuration
      </div>
    </div>
  );
};

export const LuiFormFooter = () => {
  return (
    <div className="flex border-t border-t-border-default-light bg-surface-default-light px-spacing-3xl pt-spacing-lg pb-spacing-sm">
      <LuiButton />
      <LuiButtonPrimary className="ml-[8px] flex-auto" />
    </div>
  );
};

export const LuiButton = () => {
  return (
    <button className="text-lg-medium h-components-button-lg-height min-w-components-button-lg-min-width rounded-components-button-lg-radius border border-border-default-light bg-surface-searchfield-light px-components-button-lg-padding text-text-subtle-light shadow-button-basic">
      Cancel
    </button>
  );
};

export const LuiButtonPrimary = (props: { className?: string }) => {
  return (
    <button
      className={cn(
        'text-lg-medium h-components-button-lg-height min-w-components-button-lg-min-width rounded-components-button-lg-radius border border-border-default-light bg-surface-primary-default-light px-components-button-lg-padding text-text-static-white-light shadow-button-basic',
        props.className,
      )}
    >
      Generate
    </button>
  );
};
