import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { VirtuosoModel } from './virtuoso.model';

@injectable()
export class ChatCommonModel {
  constructor(@inject(VirtuosoModel) public virtuoso: VirtuosoModel) {
    makeObservable(this);
  }
}
