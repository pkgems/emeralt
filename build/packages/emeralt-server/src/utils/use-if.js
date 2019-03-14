const stub = (_1, _2, next) => next();
// better name?
export const useIf = (condition, handler) => condition ? handler : stub;
