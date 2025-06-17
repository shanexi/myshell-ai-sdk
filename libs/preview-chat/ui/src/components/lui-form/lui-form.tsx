import { json_schema } from '@myshell-run/common-def';
import { cn, LuiFormItem } from '@myshell-run/common-ui';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { PreviewChatModel } from '../preview-chat-model';
import { Button } from './button';
import { LuiFormModel } from './lui-form.model';
import { z } from 'zod';
import { validate } from './lui-form.utils';

export const LuiForm = observer<{
  model: LuiFormModel;
  jsonschema: z.infer<typeof json_schema>;
  uischema: Record<string, { variant: string }>;
}>(({ model, jsonschema, uischema }) => {
  jsonschema = json_schema.parse(jsonschema);
  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          description: '',
        } as Record<string, unknown>
      }
      validateOnChange={false}
      validate={(values) => {
        validate(jsonschema, values);
        // todo: 转化成 error
        const errors = {};
        return;
      }}
      onSubmit={(values) => {
        console.log('submit', values);
      }}
    >
      {(fProp) => {
        useEffect(() => {
          return model.setFormikProps(fProp);
        }, []);
        return (
          // https://formik.org/docs/api/form
          // is identical to this...
          //  <form onReset={formikProps.handleReset} onSubmit={formikProps.handleSubmit} {...props} />
          <Form>
            <div className="flex h-full flex-col">
              <FormHeader>{jsonschema.title}</FormHeader>
              <div
                className={cn(
                  'bg-white',
                  'px-[16px] py-[12px]',
                  'flex flex-col gap-spacing-3xl-v2',
                  'flex-1 overflow-auto',
                )}
              >
                {Object.keys(jsonschema.properties).map((k) => {
                  const item = jsonschema.properties[k];
                  const variant = uischema[k].variant;
                  return (
                    <Field key={k} name={k}>
                      {(fieldProps: FieldProps) => {
                        return (
                          <LuiFormItemWrapper
                            key={k}
                            name={k}
                            label={item.title}
                            description={item.description}
                          >
                            <LuiFormItem
                              {...item}
                              fieldProps={fieldProps}
                              variant={variant}
                            />
                          </LuiFormItemWrapper>
                        );
                      }}
                    </Field>
                  );
                })}
              </div>
              <LuiFormFooter />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
});

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
      <Button onClick={() => model.setLuiFormOpen(false)} type="button">
        Cancel
      </Button>
      <Button
        variant="primary"
        type="submit"
        className="ml-[8px] flex-auto"
        onClick={model.submitLuiForm}
      >
        Generate
      </Button>
    </div>
  );
};
