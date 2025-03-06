import { LuiFormButton } from './lui-form-button';
import { Upload } from './upload';

export const LuiForm = () => {
  return (
    <div>
      <LuiFormHeader />
      <div className="bg-surface-default-light px-spacing-xl pt-spacing-lg pb-spacing-3xl">
        <LuiFormItem label="Title" description="This is a simple description.">
          <Upload />
        </LuiFormItem>
      </div>
      <LuiFormFooter />
    </div>
  );
};

export const LuiFormItem = (props: {
  label: string;
  description: string;
  children: React.ReactNode;
}) => {
  const { label, description, children } = props;
  return (
    <div>
      <div className="text-sm-medium mb-[4px] text-text-default-light">
        {label}
      </div>
      <div className="text-sm-regular mb-[6px] text-text-subtler-light">
        {description}
      </div>
      {children}
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
