var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const authBasic = (token, { auth }) => __awaiter(this, void 0, void 0, function* () {
    // token = username:password | base64
    const [username, password] = Buffer.from(token, 'base64')
        .toString()
        .split(':');
    const valid = yield auth.comparePassword(username, password);
    if (valid) {
        return {
            name: username,
        };
    }
    else {
        throw new Error('Invalid username or password');
    }
});
const authBearer = (token, { services }) => {
    return services.jwt.verify(token);
};
export const decodeAuthToken = (auth, params) => __awaiter(this, void 0, void 0, function* () {
    // auth = "type token"
    const [type, token] = auth.split(' ');
    if (type === 'Basic') {
        return authBasic(token, params);
    }
    if (type === 'Bearer') {
        return authBearer(token, params);
    }
    // TODO: Support more auth types?
    throw new Error('Unsupported auth type');
});
