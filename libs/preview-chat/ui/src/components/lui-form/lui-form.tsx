import { ImageChoice } from './image-choice';
import { Button } from './button';
import { Textarea } from './textarea';
import { Upload } from './upload';
import { cn } from '@myshell-run/common-ui';

export const LuiForm = () => {
  return (
    <div>
      <FormHeader>Image Configuration</FormHeader>
      <div
        className={cn(
          'bg-white',
          'px-[16px] py-[12px]',
          'flex flex-col gap-spacing-3xl-v2',
        )}
      >
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
    <div className="">
      <div className="text-sm-medium text-Cr-text-default-light-v2">
        {label}
      </div>
      {description && (
        <div className="text-sm-regular mt-[4px] text-Cr-text-subtler-light-v2">
          {description}
        </div>
      )}
      <div className="mt-spacing-sm-v2">{children}</div>
    </div>
  );
};

export const FormHeader = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children } = props;
  return (
    <div
      className={cn(
        'px-spacing-3xl-v2 py-spacing-md-v2',
        'display-xs',
        'text-Cr-text-default-light-v2',
        'bg-white',
        'border-b border-b-Cr-border-default-light-v2',
        'text-center',
      )}
    >
      {children}
    </div>
  );
};

export const LuiFormFooter = () => {
  return (
    <div
      className={cn(
        'border-t border-t-Cr-border-default-light-v2',
        'bg-white',
        'flex',
        'px-spacing-xl-v2 pt-spacing-lg-v2 pb-spacing-sm-v2',
      )}
    >
      <Button>Cancel</Button>
      <Button variant="primary" className="ml-[8px] flex-auto">
        Generate
      </Button>
    </div>
  );
};
