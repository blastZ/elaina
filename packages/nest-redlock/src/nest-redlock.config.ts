import { ModuleMetadata, Type } from "@nestjs/common";
import { RedisOptions } from "ioredis";
import { Settings } from "redlock";
import { NestRedlockConfigFactory } from "./nest-redlock.interface";

export interface NestRedlockConfig {
  clients: RedisOptions[];
  settings?: Partial<Settings>;
  onError?: (...args: any[]) => void;
}

export interface NestRedlockDynamicConfig
  extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (
    ...args: any[]
  ) => Promise<NestRedlockConfig> | NestRedlockConfig;
  useClass?: Type<NestRedlockConfigFactory>;
  useExisting?: Type<NestRedlockConfigFactory>;
  inject?: any[];
}
