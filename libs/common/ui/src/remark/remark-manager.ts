import { Remarkable } from '@myshell-run/def';
import { injectable } from 'inversify';

@injectable()
export class RemarkableManager {
  private remarkableMap = new Map<string, Remarkable>();

  set(id: string, remarkable: Remarkable) {
    this.remarkableMap.set(id, remarkable);
  }
  get<T extends Remarkable>(id: string) {
    return this.remarkableMap.get(id) as T;
  }
}
