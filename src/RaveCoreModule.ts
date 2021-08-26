import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { raveModuleOptions, raveToken } from './constants';
import {
  RaveAsyncOptions,
  RaveOptions,
  RaveOptionsFactory,
} from './interfaces';
import { createRaveProvider } from './providers';
import { getRaveClient } from './util';

@Global()
@Module({})
export class RaveCoreModule {
  public static forRoot(options: RaveOptions): DynamicModule {
    const provider = createRaveProvider(options);

    return {
      exports: [provider],
      module: RaveCoreModule,
      providers: [provider],
    };
  }

  static forRootAsync(options: RaveAsyncOptions): DynamicModule {
    const raveProvider: Provider = {
      inject: [raveModuleOptions],
      provide: raveToken,
      useFactory: (raveOptions: RaveOptions) =>
        getRaveClient(raveOptions),
    };

    return {
      exports: [raveProvider],
      imports: options.imports,
      module: RaveCoreModule,
      providers: [...this.createAsyncProviders(options), raveProvider],
    };
  }

  private static createAsyncProviders(
    options: RaveAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: RaveAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: raveModuleOptions,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: raveModuleOptions,
      useFactory: (optionsFactory: RaveOptionsFactory) =>
        optionsFactory.createRaveOptions(),
    };
  }
}
