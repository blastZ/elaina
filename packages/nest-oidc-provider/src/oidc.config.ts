import { ModuleMetadata, Type } from '@nestjs/common';
import { Configuration } from 'oidc-provider';
import { OidcConfigFactory } from './oidc.interface';

export interface OidcConfig {
  issuer: string;
  path?: string;
  configuration?: Configuration;
}

export interface OidcDynamicConfig extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<OidcConfig> | OidcConfig;
  inject?: any[];
  useClass?: Type<OidcConfigFactory>;
  useExist?: Type<OidcConfigFactory>;
}
