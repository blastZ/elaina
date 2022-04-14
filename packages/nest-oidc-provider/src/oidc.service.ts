import { Controller, Inject, Injectable } from "@nestjs/common";
import { Provider } from "oidc-provider";
import { OidcConfig } from "./oidc.config";
import { OIDC_CONFIG } from "./oidc.constant";
import { OidcController } from "./oidc.controller";

@Injectable()
export class OidcService {
  private provider: Provider;

  constructor(@Inject(OIDC_CONFIG) private oidcConfig: OidcConfig) {
    this.provider = new Provider(
      this.oidcConfig.issuer,
      this.oidcConfig.configuration
    );

    if (oidcConfig.path) {
      Controller({
        path: this.oidcConfig.path,
      })(OidcController);
    }
  }

  callback() {
    return this.provider.callback();
  }

  getPath() {
    return this.oidcConfig.path;
  }

  getProvider() {
    return this.provider;
  }
}
