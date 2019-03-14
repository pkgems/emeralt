/// <reference types="node" />
import { Person } from './person';
import { TVersion } from './version';
export declare type TMetadata = {
    name: string;
    author: Person;
    version: string;
    main: string;
    versions?: {
        [version: string]: TVersion;
    };
    time?: {
        [version: string]: string;
    };
    'dist-tags'?: {
        [tag: string]: string;
    };
    dist?: {
        [name: string]: {
            integrity: string;
            shasum: string;
            tarball: string;
        };
    };
    _attachments?: {
        [name: string]: {
            content_type: string;
            data: Buffer;
        };
    };
    _owner: string;
    [key: string]: any;
};
//# sourceMappingURL=metadata.d.ts.map