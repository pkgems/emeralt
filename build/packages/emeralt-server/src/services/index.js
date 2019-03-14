import { jwtService } from './jwt';
export const createServices = (params) => ({
    jwt: jwtService(params),
});
