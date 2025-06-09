import { inject, injectable } from 'inversify';
import { UppyModel } from '@myshell-run/common-ui';
import { computed } from 'mobx';

@injectable()
export class UploadModel {
  constructor(@inject(UppyModel) public uppyModel: UppyModel) {
    //
  }

  @computed get file() {
    return this.uppyModel.uppyStateMap.entries().next().value;
  }
}
