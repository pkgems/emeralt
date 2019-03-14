// handlers
import { pingHandler } from './ping';
import { searchHandler } from './search';
import { packagesHandler } from './packages';
import { loginHandler } from './login';
import { adduserHandler } from './adduser';
import { sysHandler } from './sys';
export const createHandlers = (params) => ({
    ping: pingHandler(params),
    search: searchHandler(params),
    packages: packagesHandler(params),
    login: loginHandler(params),
    adduser: adduserHandler(params),
    sys: sysHandler(params),
});
