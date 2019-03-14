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
export const getPackageTarballHandler = ({ storage }) => Router().get(endpoints.package.getTarball, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { name, version } = req.params;
    const rs = yield storage.getTarball(name, version);
    if (rs) {
        res.header('content-encoding', 'application/octet-stream');
        rs.pipe(res);
    }
    else {
        res.status(404).json({ ok: false });
    }
}));
