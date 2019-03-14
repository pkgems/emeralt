var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Redis from 'ioredis';
class CEmeraltDatabaseRedis {
    constructor(options) {
        this.options = options;
        this.parseRecord = (rec) => {
            return Object.keys(rec).reduce((acc, key) => {
                return Object.assign({}, acc, { [key]: JSON.parse(rec[key]) });
            }, {});
        };
        this.redis = new Redis(this.options.redis);
    }
    getPath(str) {
        return `${this.options.prefix}${str}`;
    }
    getMetadatas() {
        return this.redis.hgetall(this.getPath('packages')).then(this.parseRecord);
    }
    hasMetadata(name) {
        return this.redis
            .hexists(this.getPath('packages'), name)
            .then((r) => Boolean(r));
    }
    getMetadata(name) {
        return this.redis
            .hget(this.getPath('packages'), name)
            .then((r) => JSON.parse(r));
    }
    putMetadata(name, data) {
        return this.redis.hset(this.getPath('packages'), name, JSON.stringify(data));
    }
    getVersions(name) {
        return this.redis
            .hgetall(this.getPath(`versions-${name}`))
            .then(this.parseRecord);
    }
    hasVersion(name, version) {
        return this.redis
            .hexists(this.getPath(`versions-${name}`), version)
            .then((r) => Boolean(r));
    }
    getVersion(name, version) {
        return this.redis
            .hget(this.getPath(`versions-${name}`), version)
            .then((r) => JSON.parse(r));
    }
    putVersion(name, version, data) {
        return void this.redis.hset(this.getPath(`versions-${name}`), version, JSON.stringify(data));
    }
    dropData() {
        return this.redis.flushdb();
    }
    healthz() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.redis.ping();
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
export const EmeraltDatabaseRedis = (options) => () => new CEmeraltDatabaseRedis(options);
