import { MyAppEnv } from './my-app-worker-configuration';

export type HonoEnv = {
  Bindings: MyAppEnv;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};
