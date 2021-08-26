import { Inject } from '@nestjs/common';
import { raveToken } from '../constants';

export function InjectRave() {
  return Inject(raveToken);
}
