import { json } from 'body-parser';
import compression from 'compression';
import { loggerMiddleware } from './logger';
import { verifyTokenMiddleware } from './verify-token';
import { contextMiddleware } from './context';
export const createMiddlewares = (params) => ({
    json: json({
        limit: '64MB',
    }),
    compression: compression(),
    context: contextMiddleware(params),
    logger: loggerMiddleware(params),
    verifyToken: verifyTokenMiddleware(params),
});
