import rave = require('flutterwave-node');
import { RaveOptions } from '../interfaces';

export function getRaveClient({ publicKey, privateKey, flag }: RaveOptions): rave {
  const raveClient = new rave(publicKey, privateKey, flag);

  return raveClient;
}
