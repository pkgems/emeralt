import { IEmeraltAuth, IEmeraltDatabase, IEmeraltStorage } from '@emeralt/types';
import { createServices } from '@emeralt/server/src/services';
import { createMiddlewares } from '@emeralt/server/src/middlewares';
import { CEmeraltAuth } from './auth';
import { CEmeraltDatabase } from './database';
import { CEmeraltStorage } from './storage';
export declare type TEmeraltServerConfig = {
    logLevel?: 'combined' | 'common' | 'dev' | 'short' | 'tiny' | 'silent';
    jwt?: {
        secret?: string;
    };
    url?: string;
    endpoints?: {
        ping?: boolean;
        search?: boolean;
        login?: boolean;
        adduser?: boolean;
        package?: {
            get?: boolean;
            publish?: boolean;
        };
        sys?: {
            healthz?: boolean;
        };
    };
};
export declare type TEmeraltServerParams = {
    config?: TEmeraltServerConfig;
    auth: ReturnType<IEmeraltAuth>;
    database: ReturnType<IEmeraltDatabase>;
    storage: ReturnType<IEmeraltStorage>;
};
export declare type TEmeraltServerParamsInternal = {
    config: TEmeraltServerConfig;
    auth: CEmeraltAuth;
    database: CEmeraltDatabase;
    storage: CEmeraltStorage;
};
export declare type TEmeraltServiceParams = TEmeraltServerParamsInternal;
export declare type TEmeraltMiddlewareParams = TEmeraltServerParamsInternal & {
    services: ReturnType<typeof createServices>;
};
export declare type TEmeraltHandlerParams = TEmeraltServerParamsInternal & {
    services: ReturnType<typeof createServices>;
    middlewares: ReturnType<typeof createMiddlewares>;
};
export declare type TDecodedToken = {
    name: string;
    iat?: number;
    exp?: number;
};
declare global {
    namespace Express {
        interface Request {
            context: {
                decodedToken?: TDecodedToken;
            };
        }
    }
}
//# sourceMappingURL=server.d.ts.map