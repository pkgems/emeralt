export const contextMiddleware = (params) => (req, res, next) => {
    req.context = {};
    next();
};
