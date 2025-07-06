import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { EdixModel } from './edix.model';
import { UppyModel } from './uppy.model';
import { VirtuosoModel } from './virtuoso.model';

@injectable()
export class ChatCommonModel {
  constructor(
    @inject(UppyModel) public uppyModel: UppyModel,
    @inject(EdixModel) public edixModel: EdixModel,
    @inject(VirtuosoModel) public virtuosoModel: VirtuosoModel,
  ) {
    makeObservable(this);
  }
}
