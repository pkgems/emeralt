import jwt from 'jsonwebtoken';
export const jwtService = (params) => {
    const { secret } = params.config.jwt;
    return {
        sign: (data) => jwt.sign(data, secret),
        verify: (token) => jwt.verify(token, secret),
    };
};
