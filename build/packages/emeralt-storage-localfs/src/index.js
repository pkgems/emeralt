var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pathExists, remove, createReadStream, mkdirp, writeFile, } from 'fs-extra';
import { resolve } from 'path';
export const EmeraltStorageLocalFS = ({ path = 'node_modules/.data', }) => () => {
    return {
        getTarball: (name, version) => __awaiter(this, void 0, void 0, function* () {
            const file = resolve(path, name, version);
            if (yield pathExists(file))
                return createReadStream(file);
            else
                return undefined;
        }),
        putTarball: (name, version, tarball) => __awaiter(this, void 0, void 0, function* () {
            const dir = resolve(path, name);
            const file = resolve(dir, version);
            yield mkdirp(dir);
            yield writeFile(file, tarball);
        }),
        dropData: () => {
            return remove(path);
        },
        healthz: () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield mkdirp(path);
                return { ok: true };
            }
            catch (error) {
                return {
                    ok: false,
                    message: error.message,
                    error: error,
                };
            }
        }),
    };
};
