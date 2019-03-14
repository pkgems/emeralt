/// <reference types="node" />
import http from 'http';
import { TEmeraltServerParams, TEmeraltServerParamsInternal } from '@emeralt/types';
declare type EmeraltServer = http.Server & {
    emeralt: TEmeraltServerParamsInternal;
};
export declare const createEmeraltRouter: (params: TEmeraltServerParams) => Promise<import("express-serve-static-core").Router>;
export declare const createEmeraltServer: (params: TEmeraltServerParams) => Promise<EmeraltServer>;
export {};
//# sourceMappingURL=server.d.ts.map