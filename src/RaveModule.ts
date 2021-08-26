import { DynamicModule, Module } from '@nestjs/common';
import { RaveAsyncOptions, RaveOptions } from './interfaces';
import { RaveCoreModule } from './RaveCoreModule';

@Module({})
export class RaveModule {
  public static forRoot(options: RaveOptions): DynamicModule {
    return {
      module: RaveModule,
      imports: [RaveCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: RaveAsyncOptions): DynamicModule {
    return {
      module: RaveModule,
      imports: [RaveCoreModule.forRootAsync(options)],
    };
  }
}
