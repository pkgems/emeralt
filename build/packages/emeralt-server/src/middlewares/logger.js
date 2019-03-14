import morgan from 'morgan';
export const loggerMiddleware = (params) => params.config.logLevel !== 'silent'
    ? morgan(params.config.logLevel)
    : (req, res, next) => next();
