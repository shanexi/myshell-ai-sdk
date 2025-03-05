import { LuiFormButton } from './lui-form-button';

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
      <LuiFormButton>Cancel</LuiFormButton>
      <LuiFormButton variant="primary" className="ml-[8px] flex-auto">
        Generate
      </LuiFormButton>
    </div>
  );
};
