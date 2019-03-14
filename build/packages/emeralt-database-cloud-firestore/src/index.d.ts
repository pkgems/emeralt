import { IEmeraltDatabase } from '@emeralt/types';
declare type Options = {
    prefix?: {
        collection: string;
        document: string;
    };
    firestore?: FirebaseFirestore.Settings;
};
export declare const EmeraltDatabaseCloudFirestore: IEmeraltDatabase<Options>;
export {};
//# sourceMappingURL=index.d.ts.map