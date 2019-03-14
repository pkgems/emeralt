export const emeraltServerDefaultConfig = {
    logLevel: 'dev',
    jwt: {
        secret: 'secret',
    },
    url: 'http://localhost:8080',
    endpoints: {
        ping: true,
        search: true,
        login: true,
        adduser: true,
        package: {
            get: true,
            publish: true,
        },
        sys: {
            healthz: true,
        },
    },
};
