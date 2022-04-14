import { OidcConfig } from "./oidc.config";

export interface OidcConfigFactory {
  createOidcConfig: (...args: any[]) => OidcConfig;
}
