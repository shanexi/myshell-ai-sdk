import { AsyncLocalStorage } from 'async_hooks';
import { Span } from './minimal-nodejs-otel-tracer/index';

type Context = { spanID: string; traceID: string; span: Span };

export class Tracing {
  static asyncLocalStorage = new AsyncLocalStorage<Context>();

  static globalAttributes = new Map();

  static servicename = '';

  static exporter = (span: Span) => {
    //
  };

  static getCurrentSpan = () => {
    const ctx = Tracing.asyncLocalStorage.getStore()!;
    return ctx.span;
  };

  static getContext = () => Tracing.asyncLocalStorage.getStore();

  static async setContext<R>(
    ctx: Context,
    cb: (...args: any[]) => R,
    ...args: any[]
  ) {
    const r = await Tracing.asyncLocalStorage.run(ctx, cb, ...args);
    return r;
  }

  static async startSpan<R>(name: string, lambda: (...args: any[]) => R) {
    // eslint-disable-next-line prefer-const
    let ctx = Tracing.asyncLocalStorage.getStore();
    // eslint-disable-next-line prefer-const
    let span = new Span(
      name,
      ctx,
      new Map([['service.name', Tracing.servicename]]),
    );
    const r = await Tracing.setContext(span.getContext(), lambda, span);
    span.end();
    // TODO batch 一个窗口比如使用 scheduler
    Tracing.exporter(span);
    return r;
  }
}

export const EMPTY_CONTEXT = {};
Tracing.asyncLocalStorage.enterWith(EMPTY_CONTEXT as Context);
