var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Firestore, } from '@google-cloud/firestore';
class CEmeraltDatabaseCloudFirestore {
    constructor(options) {
        this.options = options;
        this.reduceCollection = (col) => col.get().then((collection) => collection.docs.reduce((acc, cur) => (Object.assign({}, acc, { [this.decode(cur.id)]: cur.data() })), {}));
        const { document, collection } = this.options.prefix || {
            document: 'emeralt-test',
            collection: 'emeralt-test',
        };
        let firestore = new Firestore(this.options.firestore)
            .collection(collection)
            .doc(document);
        this.db = {
            metadatas: firestore.collection('metadatas'),
            versions: firestore.collection('versions'),
            ping: firestore.collection('ping').doc('ping'),
        };
    }
    encode(n) {
        return encodeURIComponent(n);
    }
    decode(n) {
        return decodeURIComponent(n);
    }
    getMetadatas() {
        return this.reduceCollection(this.db.metadatas);
    }
    hasMetadata(name) {
        return this.db.metadatas
            .doc(this.encode(name))
            .get()
            .then((d) => d.exists);
    }
    getMetadata(name) {
        return this.db.metadatas
            .doc(this.encode(name))
            .get()
            .then((d) => d.data());
    }
    putMetadata(name, data) {
        this.db.metadatas.doc(this.encode(name)).set(data, {
            merge: true,
        });
    }
    getVersions(name) {
        return this.reduceCollection(this.db.versions.doc(this.encode(name)).collection('versions'));
    }
    hasVersion(name, version) {
        return this.db.versions
            .doc(this.encode(name))
            .collection('versions')
            .doc(this.encode(version))
            .get()
            .then((d) => d.exists);
    }
    getVersion(name, version) {
        return this.db.versions
            .doc(this.encode(name))
            .collection('versions')
            .doc(this.encode(version))
            .get()
            .then((d) => d.data());
    }
    putVersion(name, version, data) {
        return this.db.versions
            .doc(this.encode(name))
            .collection('versions')
            .doc(this.encode(version))
            .set(data, {
            merge: true,
        });
    }
    dropData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.metadatas
                .listDocuments()
                .then((metadatas) => Promise.all(metadatas.map((d) => d.delete())));
            yield this.db.versions.listDocuments().then((names) => Promise.all(names.map((d) => __awaiter(this, void 0, void 0, function* () {
                yield d
                    .collection('versions')
                    .listDocuments()
                    .then((versions) => Promise.all(versions.map((doc) => doc.delete())));
                yield d.delete();
            }))));
        });
    }
    healthz() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.ping.set({ lastUpdated: Date.now() });
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
export const EmeraltDatabaseCloudFirestore = (options) => () => new CEmeraltDatabaseCloudFirestore(options);
