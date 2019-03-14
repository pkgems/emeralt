import { IEmeraltDatabase } from '@emeralt/types';
import { IndexOptions } from 'mongodb';
declare type Options = {
    uri?: string;
    indexing?: {
        metadatas: boolean;
        versions: boolean;
        options?: IndexOptions;
    } | false;
};
export declare const defaultOptions: Options;
export declare const EmeraltDatabaseMongoDB: IEmeraltDatabase<Options>;
export {};
//# sourceMappingURL=index.d.ts.map