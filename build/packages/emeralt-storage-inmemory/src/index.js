import { path, assocPath } from 'ramda';
import { Readable } from 'stream';
export const EmeraltStorageInMemory = () => () => {
    let storage = {};
    return {
        getTarball: (name, version) => {
            const buffer = path([name, version], storage);
            if (buffer) {
                const rs = new Readable();
                rs.push(buffer);
                rs.push(null);
                return rs;
            }
            else {
                return undefined;
            }
        },
        putTarball: (name, version, tarball) => {
            storage = assocPath([name, version], tarball, storage);
        },
        dropData() {
            storage = {};
        },
        healthz() {
            return { ok: true };
        },
    };
};
