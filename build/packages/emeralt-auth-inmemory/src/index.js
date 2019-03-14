var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const base64 = {
    encode: (str) => Buffer.from(str).toString('base64'),
    decode: (str) => Buffer.from(str, 'base64').toString('ascii'),
};
class CEmeraltAuthInMemory {
    constructor(db, users = {}) {
        this.db = db;
        this.users = new Map();
        for (const username in users) {
            this.users.set(username, base64.encode(users[username]));
        }
    }
    hasUser(username) {
        return this.users.has(username);
    }
    putUser(username, password) {
        this.users.set(username, base64.encode(password));
    }
    comparePassword(username, password) {
        const hash = this.users.get(username);
        return Boolean(hash && password && base64.decode(hash) === password);
    }
    canUser(username, action, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (action === 'get') {
                // TODO
                return true;
            }
            else {
                const metadata = yield this.db.getMetadata(name);
                return !metadata || metadata._owner === username;
            }
        });
    }
    dropData() {
        this.users.clear();
    }
    healthz() {
        return { ok: true };
    }
}
export const EmeraltAuthInMemory = ({ users }) => (_, db) => new CEmeraltAuthInMemory(db, users);
