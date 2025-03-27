import { injectable, decorate } from 'inversify';
import { makeObservable } from 'mobx';

@injectable()
export class AuthModel {
  userId?: string;
  constructor() {
    makeObservable(this);
  }

  setUserId = (userId: string) => {
    this.userId = userId;
  };
}

// decorate(injectable(), AuthModel);
