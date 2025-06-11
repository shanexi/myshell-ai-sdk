import { jsonschema } from '@myshell-run/common-def';
import { cn, LuiFormItem } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { z } from 'zod';
import { PreviewChatModel } from '../preview-chat-model';
import { Button } from './button';

export const LuiForm: React.FC<{
  jsonschema: z.infer<typeof jsonschema>;
  uischema: Record<
    string,
    {
      variant: string;
    }
  >;
}> = ({ jsonschema: jsonschemaData, uischema }) => {
  jsonschemaData = jsonschema.parse(jsonschemaData);
  return (
    <div className="flex h-full flex-col">
      <FormHeader>{jsonschemaData.title}</FormHeader>
      <div
        className={cn(
          'bg-white',
          'px-[16px] py-[12px]',
          'flex flex-col gap-spacing-3xl-v2',
          'flex-1 overflow-auto',
        )}
      >
        {Object.keys(jsonschemaData.properties).map((k) => {
          const item = jsonschemaData.properties[k];
          const variant = uischema[k].variant;
          return (
            <LuiFormItemWrapper
              key={k}
              name={k}
              label={item.title}
              description={item.description}
            >
              <LuiFormItem {...item} variant={variant} />
            </LuiFormItemWrapper>
          );
        })}
      </div>
      <LuiFormFooter />
    </div>
  );
};

export const LuiFormItemWrapper = (props: {
  label: string;
  name: string;
  description?: string;
  children: React.ReactNode;
}) => {
  const { label, description, children, name } = props;
  return (
    <div className="">
      <label
        htmlFor={name}
        className="text-sm-medium text-Cr-text-default-light-v2"
      >
        {label}
      </label>
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
  const model = useInjection(PreviewChatModel);
  return (
    <div
      className={cn(
        'border-t border-t-Cr-border-default-light-v2',
        'bg-white',
        'flex',
        'px-spacing-xl-v2 pt-spacing-lg-v2 pb-spacing-sm-v2',
      )}
    >
      <Button onClick={() => model.setLuiFormOpen(false)}>Cancel</Button>
      <Button variant="primary" className="ml-[8px] flex-auto">
        Generate
      </Button>
    </div>
  );
};
