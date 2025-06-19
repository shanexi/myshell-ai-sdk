import { injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { type FormikProps } from 'formik';

@injectable()
export class FormikModel {
  isReadyPromise: Promise<Record<string, unknown>>;
  public formikProps?: FormikProps<Record<string, unknown>>; // if undef throw error, fail fast
  private isReadyPromiseResolve:
    | ((value: Record<string, unknown>) => void)
    | undefined;

  constructor() {
    makeObservable(this);
    this.isReadyPromise = new Promise((resolve) => {
      this.isReadyPromiseResolve = resolve;
    });
  }

  setFormikProps(formikProps: FormikProps<Record<string, unknown>>) {
    this.formikProps = formikProps;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.isReadyPromiseResolve!({});
    return () => {
      this.reset();
    };
  }

  private reset(): void {
    this.isReadyPromise = new Promise((resolve) => {
      this.isReadyPromiseResolve = resolve;
    });
    this.formikProps = undefined;
  }
}
