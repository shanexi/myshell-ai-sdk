import { inject, injectable } from 'inversify';
import { UppyModel } from '@myshell-run/common-ui';

@injectable()
export class UploadModel {
  constructor(@inject(UppyModel) public uppyModel: UppyModel) {
    //
  }
}
