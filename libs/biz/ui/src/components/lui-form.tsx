import { ImageChoice } from './image-choice';
import { Button } from './button';
import { Textarea } from './textarea';
import { Upload } from './upload';

export const LuiForm = () => {
  return (
    <div>
      <FormHeader>
        <div className="display-sm-semibold pt-spacing-md-v1">
          Image Configuration
        </div>
      </FormHeader>
      <div className="bg-surface-default-light-v1 px-spacing-xl-v1 pt-spacing-lg-v1 pb-spacing-3xl-v1">
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
    <div className="mb-spacing-3xl-v1">
      <div className="text-sm-medium text-text-default-light-v1">{label}</div>
      {description && (
        <div className="text-sm-regular mt-[4px] text-text-subtler-light-v1">
          {description}
        </div>
      )}
      <div className="mt-spacing-sm-v1">{children}</div>
    </div>
  );
};

export const FormHeader = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children } = props;
  return (
    <div className="flex justify-center rounded-tl-2xl-v1 rounded-tr-2xl-v1 border-b border-b-border-default-light-v1 bg-surface-default-light-v1 px-spacing-3xl-v1 py-spacing-lg-v1">
      {children}
    </div>
  );
};

export const LuiFormFooter = () => {
  return (
    <div className="flex border-t border-t-border-default-light-v1 bg-surface-default-light-v1 px-spacing-3xl-v1 pt-spacing-lg-v1 pb-spacing-sm-v1">
      <Button>Cancel</Button>
      <Button variant="primary" className="ml-[8px] flex-auto">
        Generate
      </Button>
    </div>
  );
};
