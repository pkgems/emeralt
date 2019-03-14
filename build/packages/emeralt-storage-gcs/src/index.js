var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { join } from 'path';
import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';
class CEmeraltStorageGCS {
    constructor({ storage, path = {
        bucket: 'emeralt-test',
        prefix: '',
    }, }) {
        this.bucket = new Storage(storage).bucket(path.bucket);
        this.prefix = path.prefix;
    }
    getTarball(name, version) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.bucket.file(join(this.prefix, name, version));
            if (yield file.exists()) {
                return new Readable().wrap(file.createReadStream());
            }
            else {
                return undefined;
            }
        });
    }
    putTarball(name, version, tarball) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((rs, rj) => __awaiter(this, void 0, void 0, function* () {
                const file = this.bucket.file(join(this.prefix, name, version));
                const ws = file
                    .createWriteStream()
                    .on('finish', rs)
                    .on('close', rs)
                    .on('error', rj);
                ws.write(tarball, 'base64', () => {
                    ws.end();
                });
            }));
        });
    }
    dropData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bucket.deleteFiles();
        });
    }
    healthz() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [ok] = yield this.bucket.exists();
                return ok
                    ? { ok: true }
                    : { ok: false, message: 'GCS bucket does not exist!' };
            }
            catch (error) {
                return {
                    ok: false,
                    message: error.message,
                    error: error,
                };
            }
        });
    }
}
export const EmeraltStorageGCS = (options) => () => new CEmeraltStorageGCS(options);
