var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express, { Router } from 'express';
import http from 'http';
import merge from 'deepmerge';
import { createServices } from '@/services';
import { createMiddlewares } from '@/middlewares';
import { createHandlers } from '@/handlers';
import { emeraltServerDefaultConfig } from './config';
const initializeInternal = (params) => __awaiter(this, void 0, void 0, function* () {
    const database = yield params.database(params.config);
    const auth = yield params.auth(params.config, database);
    const storage = yield params.storage(params.config, database);
    // @ts-ignore
    return Object.assign({}, params, { database,
        auth,
        storage });
});
export const createEmeraltRouter = (params) => __awaiter(this, void 0, void 0, function* () {
    // merge with default config
    params.config = merge(emeraltServerDefaultConfig, params.config || {});
    // initialize plugins
    const internal = yield initializeInternal(params);
    // check every plugin is health. If no, throw an error
    const health = yield Promise.all([
        internal.auth.healthz(),
        internal.database.healthz(),
        internal.storage.healthz(),
    ]);
    if (!health.every((s) => s.ok)) {
        throw new Error(`Some plugins are unhealthy, ${{
            auth: health[0],
            database: health[1],
            storage: health[2],
        }}`);
    }
    const services = createServices(internal);
    const middlewares = createMiddlewares(Object.assign({}, internal, { services }));
    const handlers = createHandlers(Object.assign({}, internal, { services, middlewares }));
    const router = Router()
        // middlewares
        .use(middlewares.logger)
        .use(middlewares.json)
        .use(middlewares.compression)
        .use(middlewares.context)
        // handlers
        .use(handlers.ping)
        .use(handlers.login)
        .use(handlers.adduser)
        .use(handlers.search)
        .use(handlers.packages)
        .use(handlers.sys);
    // HACK FOR TESTS
    // used to dynamically change the config
    // @ts-ignore
    router._setConfig = (key, value) => {
        internal.config[key] = value;
    };
    return router;
});
export const createEmeraltServer = (params) => __awaiter(this, void 0, void 0, function* () {
    const router = yield createEmeraltRouter(params);
    const server = express()
        .set('etag', false)
        .use(router);
    const httpServer = http.createServer(server);
    // ↑ HACK FOR TESTS ↑
    // @ts-ignore
    httpServer._setConfig = router._setConfig;
    return httpServer;
});
