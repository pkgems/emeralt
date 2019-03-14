import { TEmeraltMiddlewareParams } from '@emeralt/types';
export declare const createMiddlewares: (params: TEmeraltMiddlewareParams) => {
    json: import("connect").NextHandleFunction;
    compression: any;
    context: import("express").Handler;
    logger: any;
    verifyToken: (req: any, res: any, next: any) => any;
};
//# sourceMappingURL=index.d.ts.map