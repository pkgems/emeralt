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
import jwt from 'jsonwebtoken';
import { useIf } from '@/utils';
export const adduserHandler = ({ auth, config }) => useIf(config.endpoints.adduser, Router().put(endpoints.adduser, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { name, password } = req.body;
    const valid = yield auth.comparePassword(name, password);
    return res.status(valid ? 201 : 401).json({
        ok: valid,
        id: name,
        token: valid ? jwt.sign({ name }, 'secret') : null,
    });
})));
