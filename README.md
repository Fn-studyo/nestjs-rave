
[![Coverage Status](https://coveralls.io/repos/github/seyi-adeleke/nest-paystack/badge.svg?branch=add-coveralls)](https://coveralls.io/github/seyi-adeleke/nest-paystack?branch=add-coveralls)

## Table Of Contents
- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About
`nestjs-rave` implements a `raveModule`, which when imported into
your nest modules project provides a Rave client to any class that injects it.

## Installation
```bash
npm install --save nestjs-rave
```

## Getting Started

The simplest way to use `nestjs-rave` is to import the `forRoot` function from `RaveModule` into the module in which you want to inject the service.

```typescript
import { Module } from '@nestjs-common';
import { RaveModule } from 'nestjs-rave';

@Module({
  imports: [
    RaveModule.forRoot({
      apiKey: 'sk_xxxxxxxxx',
    }),
  ],
})
export class AppModule {}
```

You can then inject the Rave client into your injectable classes by using a
custom  `InjectRave` decorator

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRave } from 'nestjs-rave';

@Injectable()
export class AppService {
  public constructor(
  @InjectRave() private readonly raveClient) {}
}
```

You can also set it up Asynchronously.

```typescript
import { Module } from '@nestjs-common';
import { RaveModule } from 'nestjs-rave';
import { RaveConfigService } from './RaveConfigService';
import  { RaveConfigModule } from './RaveConfigModule';

@Module({
  imports: [
    RaveConfigModule,
    RaveModule.forRootAsync({
      inject: [RaveConfigService],
      useFactory: (configService: RaveConfigService) =>
        RaveConfigService.getRaveConfig(),
      }),
    }),
  ],
})
export class AppModule {}
```

```typescript
// RaveConfigService.ts
import { Injectable } from '@nestjs/common';
import { RaveOptions } from 'nestjs-rave';

@Injectable()
export class ConfigService {
  public getRaveConfig(): RaveOptions {
    return {
      apiKey: 'sk_xxxxxxxxxxxxxx',
    };
  }
}
```

```typescript
// RaveConfigModule.ts
import { Global, Module } from '@nestjs/common';
import { RaveConfigService } from './RaveConfigService';

@Global()
@Module({
  exports: [RaveConfigService],
  providers: [RaveConfigService],
})
export class RaveConfigModule {}
```

## Usage
This module uses [rave](https://github.com/Flutterwave/ravepay-nodejs) and all methods defined in the documentation are available to the `raveClient`.
[Docs](https://github.com/Flutterwave/ravepay-nodejs/blob/master/README.md)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [nestjs](https://nestjs.com)
- [fluterwave-node]](https://github.com/Flutterwave/ravepay-nodejs)
- Inspired by the [nest-stripe](https://github.com/dhaspden/nestjs-stripe) module by Dylan Aspden

Copyright &copy; 2021 Muritala David
