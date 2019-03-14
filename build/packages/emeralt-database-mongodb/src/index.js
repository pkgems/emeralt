var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from 'mongodb';
import deepmerge from 'deepmerge';
export const defaultOptions = {
    uri: 'mongodb://localhost:27017/emeralt-test',
    indexing: {
        metadatas: true,
        versions: true,
        options: {
            background: true,
        },
    },
};
class CEmeraltDatabaseMongoDB {
    constructor(db) {
        this.db = db;
        this.storage = {
            metadatas: this.db.collection('metadatas'),
            versions: this.db.collection('versions'),
        };
    }
    getMetadatas() {
        return this.storage.metadatas
            .find({}, { projection: { _id: false } })
            .toArray()
            .then((metadatas) => metadatas.reduce((acc, curr) => (Object.assign({}, acc, { [curr.name]: curr })), {}));
    }
    hasMetadata(name) {
        return this.storage.metadatas
            .find({ name })
            .limit(1)
            .count()
            .then((c) => c === 1);
    }
    getMetadata(name) {
        return this.storage.metadatas.findOne({ name }, { projection: { _id: false } });
    }
    putMetadata(name, data) {
        return this.storage.metadatas.findOneAndUpdate({ name }, { $set: Object.assign({}, data) }, { upsert: true });
    }
    getVersions(name) {
        return this.storage.versions.findOne({ name }).then((v) => Object.keys(v ? v.versions : {}).reduce((acc, key) => (Object.assign({}, acc, { [key.replace(/-/g, '.')]: v.versions[key] })), {}));
    }
    hasVersion(name, version) {
        return this.getVersion(name, version).then((v) => Boolean(v));
    }
    getVersion(name, version) {
        return this.getVersions(name).then((versions) => versions[version]);
    }
    putVersion(name, version, data) {
        return this.storage.versions.findOneAndUpdate({ name }, { $set: { versions: { [version.replace(/\./g, '-')]: Object.assign({}, data) } } }, { upsert: true });
    }
    dropData() {
        return this.db.dropDatabase();
    }
    healthz() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.command({ ping: 1 });
                return { ok: true };
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
export const EmeraltDatabaseMongoDB = (userOptions) => () => __awaiter(this, void 0, void 0, function* () {
    const { uri, indexing } = deepmerge(defaultOptions, userOptions || {});
    const client = yield new MongoClient(uri, { useNewUrlParser: true }).connect();
    const db = client.db();
    yield db.createCollection('metadatas');
    yield db.createCollection('versions');
    if (indexing) {
        // use indexing for metadatas, true by default
        if (indexing.metadatas)
            yield db
                .collection('metadatas')
                .createIndex({ name: 1 }, indexing.options);
        // use indexing for versions, true by default
        if (indexing.versions)
            yield db.collection('versions').createIndex({ name: 1 }, indexing.options);
    }
    return new CEmeraltDatabaseMongoDB(db);
});
