var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { test } from './utils';
import { user } from './fixtures';
test('users', (t, authc) => __awaiter(this, void 0, void 0, function* () {
    // @ts-ignore
    const auth = yield authc({})({});
    t.log('healthz');
    t.deepEqual(yield auth.healthz(), { ok: true });
    t.log('no user');
    yield t.false(yield auth.hasUser(user.username));
    yield t.false(yield auth.comparePassword(user.username, user.password));
    yield t.false(yield auth.comparePassword(user.username, '123123'));
    t.log('add user');
    yield auth.putUser(user.username, user.password);
    t.log('with user');
    yield t.true(yield auth.hasUser(user.username));
    yield t.true(yield auth.comparePassword(user.username, user.password));
    yield t.false(yield auth.comparePassword(user.username, '123456'));
}));
