import { SetMetadata } from '@nestjs/common';
import { nextTick } from 'process';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


