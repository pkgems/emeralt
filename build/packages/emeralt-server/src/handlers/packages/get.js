var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { endpoints } from '@/constants';
import { useIf } from '@/utils';
import { Router } from 'express';
import { resolve } from 'url';
export const getPackageHandler = ({ config, database, }) => useIf(config.endpoints.package.get, Router().get(endpoints.package.get, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { package_name } = req.params;
    // retrieve metadata from database
    const metadata = yield database.getMetadata(package_name);
    if (!metadata) {
        // package not found - redirect to upstream (optional) (plugin) (dependencies)
        return res.redirect(`http://registry.npmjs.org/${package_name}`);
    }
    // retrieve all package versions
    const versions = yield database.getVersions(package_name);
    // determine tarball absolute url
    Object.keys(versions).forEach((version) => {
        versions[version].dist.tarball = resolve(config.url, `/-/tarball/${encodeURIComponent(versions[version].name)}/${encodeURIComponent(versions[version].version)}`);
    });
    res.status(200).json(Object.assign({}, metadata, { versions }));
})));
