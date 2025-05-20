import { injectable } from 'inversify';
import { computed, makeObservable, observable } from 'mobx';

export type ContextType = 'file' | 'text' | 'json' | 'todo' | 'message';

@injectable()
export class ChatInputContextPluginModel {
  @observable contextItems = observable.array<{
    type: ContextType;
    name: string;
  }>([
    { type: 'file', name: 'requirement.feature1' },
    { type: 'json', name: 'canvas.state1.inputs.variable1' },
    { type: 'todo', name: 'test.test_suite1' },
    { type: 'message', name: 'preview.message1' },
  ]);

  @computed get isEmpty() {
    return this.contextItems.length === 0;
  }

  constructor() {
    makeObservable(this);
  }
}
