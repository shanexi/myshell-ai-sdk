import { ImageChoice } from './image-choice';
import { LuiFormButton } from './lui-form-button';
import { Textarea } from './textarea';
import { Upload } from './upload';

export const LuiForm = () => {
  return (
    <div>
      <LuiFormHeader />
      <div className="bg-surface-default-light px-spacing-xl pt-spacing-lg pb-spacing-3xl">
        <LuiFormItem label="Title" description="This is a simple description.">
          <Upload />
        </LuiFormItem>
        <LuiFormItem label="Description">
          <Textarea />
        </LuiFormItem>
        <LuiFormItem
          label="Prompt"
          description="The prompt to guide QR Code generation."
        >
          <ImageChoice />
        </LuiFormItem>
      </div>
      <LuiFormFooter />
    </div>
  );
};

export const LuiFormItem = (props: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) => {
  const { label, description, children } = props;
  return (
    <div className="mb-spacing-3xl">
      <div className="text-sm-medium text-text-default-light">{label}</div>
      {description && (
        <div className="text-sm-regular mt-[4px] text-text-subtler-light">
          {description}
        </div>
      )}
      <div className="mt-spacing-sm">{children}</div>
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
