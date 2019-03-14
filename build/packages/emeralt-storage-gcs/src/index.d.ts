import { IEmeraltStorage } from '@emeralt/types';
import { StorageOptions } from '@google-cloud/storage';
declare type Options = {
    storage: StorageOptions;
    path: {
        bucket: string;
        prefix?: string;
    };
};
export declare const EmeraltStorageGCS: IEmeraltStorage<Options>;
export {};
//# sourceMappingURL=index.d.ts.map