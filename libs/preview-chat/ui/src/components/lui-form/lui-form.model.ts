import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { FormikModel } from '@myshell-run/common-ui';

@injectable()
export class LuiFormModel {
  constructor(@inject(FormikModel) public formikModel: FormikModel) {
    makeObservable(this);
  }
}
