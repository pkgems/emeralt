import { OptionalPromise } from '../helpers';
export declare type THealthz = {
    ok: boolean;
    message?: string;
    error?: Error;
};
export interface CEmeraltPlugin {
    healthz(): OptionalPromise<THealthz>;
}
//# sourceMappingURL=plugin.d.ts.map