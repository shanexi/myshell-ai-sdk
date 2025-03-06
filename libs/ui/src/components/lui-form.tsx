import { LuiFormButton } from './lui-form-button';
import { ReactComponent as ArrowUpTray } from './arrow-up-tray.svg';

export const LuiForm = () => {
  return (
    <div>
      <LuiFormHeader />
      <div className="px-spacing-xl pt-spacing-lg pb-spacing-3xl">
        <div className="text-sm-medium mb-[4px]">Title</div>
        <div className="text-sm-regular mb-[6px]">Description</div>
        <div className="rounded-lg border border-border-default-light bg-surface-default-light p-spacing-xl shadow-background-default">
          <div className="flex items-center">
            <div className="mr-spacing-lg rounded-[10px] bg-surface-accent-gray-subtlest-light p-[12px]">
              <ArrowUpTray />
            </div>
            <div>
              <div className="text-sm-medium text-text-default-light">
                Drop a file or click to upload
              </div>
              <div className="description-lg-regular text-text-subtler-light">
                PNG, JPG, GIF up to 10MB
              </div>
            </div>
          </div>
        </div>
      </div>
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
