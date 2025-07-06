import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import { VirtuosoModel } from './virtuoso.model';

// TODO ChatCommonModel 承担 chat input/chat message 等通信职责，暂时先保留
@injectable()
export class ChatCommonModel {
  constructor(@inject(VirtuosoModel) public virtuoso: VirtuosoModel) {
    makeObservable(this);
  }
}
