import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { RaveOptions } from './RaveOptions';
import { RaveOptionsFactory } from './RaveOptionsFactory';

export interface RaveAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<RaveOptionsFactory>;
  useExisting?: Type<RaveOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<RaveOptions> | RaveOptions;
}
