import { injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { type FormikProps } from 'formik';

@injectable()
export class LuiFormModel {
  isFormikReadyPromise: Promise<unknown>;
  public formikProps?: FormikProps<unknown>; // if undef throw error, fail fast
  private isFormikReadyPromiseResolve: ((value: unknown) => void) | undefined;

  constructor() {
    makeObservable(this);
    this.isFormikReadyPromise = new Promise((resolve) => {
      this.isFormikReadyPromiseResolve = resolve;
    });
  }

  setFormikProps(formikProps: FormikProps<unknown>) {
    this.formikProps = formikProps;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.isFormikReadyPromiseResolve!('');
    return () => {
      this.resetFormik();
    };
  }

  private resetFormik(): void {
    this.isFormikReadyPromise = new Promise((resolve) => {
      this.isFormikReadyPromiseResolve = resolve;
    });
    this.formikProps = undefined;
  }
}
