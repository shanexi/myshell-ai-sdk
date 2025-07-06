import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { EdixModel } from './edix.model';
import { UppyModel } from './uppy.model';
import { VirtuosoModel } from './virtuoso.model';

@injectable()
export class ChatCommonModel {
  constructor(
    @inject(UppyModel) public uppy: UppyModel,
    @inject(EdixModel) public edix: EdixModel,
    @inject(VirtuosoModel) public virtuoso: VirtuosoModel,
  ) {
    makeObservable(this);
  }
}
