export declare const createServices: (params: import("@emeralt/types").TEmeraltServerParamsInternal) => {
    jwt: {
        sign: (data: import("@emeralt/types").TDecodedToken) => string;
        verify: (token: string) => import("@emeralt/types").TDecodedToken;
    };
};
//# sourceMappingURL=index.d.ts.map