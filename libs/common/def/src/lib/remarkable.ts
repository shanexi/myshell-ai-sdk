import { type Properties } from 'hastscript';
import { interfaces } from 'inversify';

export const Remarkable = Symbol('Remarkable');
export interface Remarkable {
  onUpdate(props: Properties): void;
}

export const RemarkableFactory = Symbol('RemarkableFactory');

export type RemarkableFactory = (
  identifier: interfaces.ServiceIdentifier,
  id?: string,
) => Remarkable;

export type RegisterMap = Map<
  string,
  [React.ComponentType<unknown>, interfaces.Newable<Remarkable> | undefined]
>;
