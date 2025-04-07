import { getTraceParent } from '@myshell-run/biz-service';
import { createId } from '@paralleldrive/cuid2';
import { factory } from '../create-route';

export const traceparent = () => {
  return factory.createMiddleware(async (c, next) => {
    // 如果不存在，以此为起点
    if (!c.req.header('traceparent')) {
      const traceID = createId();
      const spanID = createId();
      c.set('traceID', traceID);
      c.set('spanID', spanID);
      c.header('traceparent', getTraceParent({ traceID, spanID }));
    }
    await next();
  });
};
