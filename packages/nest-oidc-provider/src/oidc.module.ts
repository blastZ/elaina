import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { OidcConfig, OidcDynamicConfig } from './oidc.config';
import { OIDC_CONFIG } from './oidc.constant';
import { OidcController } from './oidc.controller';
import { OidcConfigFactory } from './oidc.interface';
import { OidcService } from './oidc.service';

@Global()
@Module({
  imports: [],
  providers: [OidcService],
  exports: [OidcService],
  controllers: [],
})
export class OidcModule {
  static forRoot(config: OidcConfig): DynamicModule {
    return {
      module: OidcModule,
      providers: [
        {
          provide: OIDC_CONFIG,
          useValue: config,
        },
      ],
      exports: [],
      controllers: [OidcController],
    };
  }

  static forRootAsync(config: OidcDynamicConfig): DynamicModule {
    const providers = this.createAsyncProviders(config);

    return {
      module: OidcModule,
      imports: config.imports,
      providers,
      exports: [],
      controllers: [OidcController],
    };
  }

  private static createAsyncProviders(config: OidcDynamicConfig): Provider[] {
    if (config.useFactory) {
      return [
        {
          provide: OIDC_CONFIG,
          useFactory: config.useFactory,
          inject: config.inject,
        },
      ];
    }

    if (config.useClass || config.useExist) {
      return [
        {
          provide: OIDC_CONFIG,
          useFactory: async (configFactory: OidcConfigFactory) => {
            return await configFactory.createOidcConfig();
          },
          inject: [config.useClass || config.useExist!],
        },
      ];
    }

    return [];
  }
}
