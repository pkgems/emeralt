import { IEmeraltDatabase } from '@emeralt/types';
import { RedisOptions } from 'ioredis';
declare type Options = {
    redis?: RedisOptions;
    prefix?: string;
};
export declare const EmeraltDatabaseRedis: IEmeraltDatabase<Options>;
export {};
//# sourceMappingURL=index.d.ts.map