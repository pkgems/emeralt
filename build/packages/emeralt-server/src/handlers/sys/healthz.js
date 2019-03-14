var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { endpoints } from '@/constants';
import { Router } from 'express';
export const sysHealthzHandler = ({ auth, database, storage, }) => Router().get(endpoints.sys.healthz, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // check healthz simultaneously
    const healthzs = yield Promise.all([
        auth.healthz(),
        database.healthz(),
        storage.healthz(),
    ]);
    const ok = healthzs.every((o) => o.ok);
    return res.status(ok ? 200 : 503).json({
        ok,
        healthz: {
            auth: healthzs[0],
            database: healthzs[1],
            storage: healthzs[2],
        },
    });
}));
