import {
  Span,
  honoMiddleware,
  otlpExporter,
  getTraceParent,
  // @ts-expect-error 先不处理
} from './tracer';
export { Span, honoMiddleware, otlpExporter, getTraceParent };
