import { RaveOptions } from './RaveOptions';

export interface RaveOptionsFactory {
  createRaveOptions(): Promise<RaveOptions> | RaveOptions;
}
