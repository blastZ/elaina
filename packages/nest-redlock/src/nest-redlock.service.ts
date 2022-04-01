import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import Redlock from "redlock";
import { NestRedlockConfig } from "./nest-redlock.config";
import { NEST_REDLOCK_CONFIG } from "./nest-redlock.constant";

@Injectable()
export class RedlockService extends Redlock {
  constructor(@Inject(NEST_REDLOCK_CONFIG) redlockConfig: NestRedlockConfig) {
    const { clients, settings, onError } = redlockConfig;

    const redisClients = clients.map((client) => new Redis(client));

    super(redisClients, settings);

    onError && this.on("error", onError);
  }
}
