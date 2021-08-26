import { Provider } from '@nestjs/common';
import rave = require('flutterwave-node');
import { raveToken } from '../constants';
import { RaveOptions } from '../interfaces';
import { getRaveClient } from '../util';

export function createRaveProvider(
  options: RaveOptions,
): Provider<rave> {
  return {
    provide: raveToken,
    useValue: getRaveClient(options),
  };
}
