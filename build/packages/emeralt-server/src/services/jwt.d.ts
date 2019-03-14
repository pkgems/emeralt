import { TDecodedToken } from '@emeralt/types';
export declare const jwtService: (params: import("@emeralt/types").TEmeraltServerParamsInternal) => {
    sign: (data: TDecodedToken) => string;
    verify: (token: string) => TDecodedToken;
};
//# sourceMappingURL=jwt.d.ts.map