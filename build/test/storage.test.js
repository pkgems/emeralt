var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { test } from './utils';
import { Readable } from 'stream';
const readableToBuffer = (readable) => new Promise((resolve, reject) => {
    const bufs = [];
    readable
        .on('data', (d) => bufs.push(d))
        .on('end', () => resolve(Buffer.concat(bufs)))
        .on('error', reject);
});
test('storage', (t, createStorage) => __awaiter(this, void 0, void 0, function* () {
    // @ts-ignore
    const storage = yield createStorage({})({});
    const data = 'test';
    t.log('healthz');
    t.deepEqual(yield storage.healthz(), { ok: true });
    t.log('putTarball');
    yield storage.putTarball('test', '1.0.0', Buffer.from(data));
    t.log('getTarball');
    const readable = yield storage.getTarball('test', '1.0.0');
    t.true(readable instanceof Readable);
    const newData = yield readableToBuffer(yield storage.getTarball('test', '1.0.0')).then((t) => t.toString());
    t.is(newData, data);
}));
