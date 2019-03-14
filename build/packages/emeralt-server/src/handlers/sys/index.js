import { Router } from 'express';
// handlers
import { sysHealthzHandler } from './healthz';
export const sysHandler = (params) => Router().use(sysHealthzHandler(params));
