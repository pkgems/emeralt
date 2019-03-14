var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { test } from './utils';
import { metadata, version } from './fixtures';
test('metadata', (t, dbc) => __awaiter(this, void 0, void 0, function* () {
    // @ts-ignore
    const db = yield dbc({})({});
    t.log('healthz');
    t.deepEqual(yield db.healthz(), { ok: true });
    t.log('no metadata');
    t.deepEqual(yield db.hasMetadata(metadata.name), false);
    t.falsy(yield db.getMetadata(metadata.name));
    t.deepEqual(yield db.getMetadatas(), {});
    t.log('put metadata');
    yield db.putMetadata(metadata.name, metadata);
    t.log('with metadata');
    t.deepEqual(yield db.hasMetadata(metadata.name), true);
    t.deepEqual(yield db.getMetadata(metadata.name), metadata);
    t.deepEqual(yield db.getMetadatas(), {
        [metadata.name]: metadata,
    });
}));
test('versions', (t, dbc) => __awaiter(this, void 0, void 0, function* () {
    // @ts-ignore
    const db = yield dbc({})({});
    t.log('no version');
    t.deepEqual(yield db.hasVersion(metadata.name, version.version), false);
    t.falsy(yield db.getVersion(metadata.name, version.version));
    t.deepEqual(yield db.getVersions(metadata.name), {});
    t.log('put version');
    yield db.putVersion(metadata.name, version.version, version);
    t.log('with version');
    t.deepEqual(yield db.hasVersion(metadata.name, version.version), true);
    t.deepEqual(yield db.getVersion(metadata.name, version.version), version);
    t.deepEqual(yield db.getVersions(metadata.name), {
        [version.version]: version,
    });
}));
