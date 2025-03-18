import { Container } from 'inversify';
import { CounterModel } from './counter.model';

export const container = new Container();

container.bind(CounterModel).toSelf().inSingletonScope();
