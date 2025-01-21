import { ContainerModule } from 'inversify';
import { Converter } from './converter';
import { PrimitivePlugin } from './plugins/primitive-plugin';
import { ConverterPluginSym } from './convert-plugin';

export const figmaTwcfgMod = new ContainerModule((bind) => {
  bind(Converter).toSelf().inSingletonScope();
  bind(ConverterPluginSym).to(PrimitivePlugin).inSingletonScope();
});
