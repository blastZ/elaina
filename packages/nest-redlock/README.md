# nest-redlock

[Redlock](https://github.com/mike-marcacci/node-redlock) module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
npm install nest-redlock
```

## Usage

```ts
// app.module.ts
import { RedlockModule } from "nest-redlock";

@Module({
  imports: [
    RedlockModule.forRoot({
      clients: [
        {
          host: "localhost",
          port: 6379,
        },
      ],
    }),
  ],
})
export class AppModule {}

// example.service.ts
import { RedlockService } from "nest-redlock";

@Injectable()
export class ExampleService {
  constructor(private redlockService: RedlockService) {}

  async test(param: string) {
    const lock = await this.redlockService.acquire([`test:${param}`], 5000);

    try {
      // ...
    } finally {
      await lock.release();
    }
  }
}
```
