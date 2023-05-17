import { CTACardT } from './CTACard';

export type CTAPropertyT = CTACardT & {};

export type CTAPropertiesT = {
  [key: string]: CTAPropertyT;
};
