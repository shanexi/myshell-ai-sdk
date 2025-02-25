// const type parameters
declare function useStatues<T>(statues: T[]): T;
const loadingStatus = useStatues(['loading', 'idle']);

// const 指值在类型推导过程中不会被改变
// declare function useStatues2<const T>(statues: T[]): T
// const loadingStatus2 = useStatues2(['loading', 'idle']);
// END

// no infer
// [T] Tuple 类型；目的是后续类型推导始终保持 T 的具体类型
// ? 条件类型 始终为真 始终 0 即意味访问 Tuple 的第一个元素
type NoInfer<T> = [T][T extends any ? 0 : never];

declare function createFSM<TState extends string>(config: {
  initial: NoInfer<TState>;
  states: TState[];
}): TState;

const example = createFSM({
  initial: 'open',
  states: ['open', 'closed'],
});
// END

// declare global
declare global {
  interface Window {
    foo: () => string;
  }
}
const example = window.foo();
// END
