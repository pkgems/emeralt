var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { extractPackageData, useIf } from '@/utils';
import { endpoints } from '@/constants';
import { Router } from 'express';
import ssri from 'ssri';
export const publishPackageHandler = ({ config, middlewares, database, storage, auth, }) => useIf(config.endpoints.package.publish, Router().put(endpoints.package.publish, middlewares.verifyToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { name: username } = req.context.decodedToken;
    const { metadata, version, tarball } = extractPackageData(req.body);
    try {
        if (!metadata || !version || !tarball) {
            throw new Error('Missing package data');
        }
        if (!(yield ssri.checkData(tarball.data, version.dist.integrity))) {
            throw new Error('Integrity verification failed');
        }
        if (!(yield auth.canUser(username, 'publish', metadata.name))) {
            throw new Error('User is not allowed to publish this package');
        }
        if (yield database.hasVersion(metadata.name, version.version)) {
            throw new Error("Can't overwrite an existing version");
        }
        metadata._owner = username;
        // update or create metadata
        yield database.putMetadata(metadata.name, metadata);
        // create version
        yield database.putVersion(metadata.name, version.version, version);
        // upload tarball
        yield storage.putTarball(metadata.name, version.version, tarball.data);
        return res.status(200).json({});
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
})));
