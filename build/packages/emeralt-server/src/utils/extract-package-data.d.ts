/// <reference types="node" />
import { TMetadata } from '@emeralt/types';
export declare const extractPackageData: (pkg: TMetadata) => {
    metadata: {
        [x: string]: any;
        name: string;
        author: import("@emeralt/types/src/npm").Person;
        version: string;
        main: string;
        versions?: {
            [version: string]: import("@emeralt/types").TVersion;
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
    };
    version: import("@emeralt/types").TVersion;
    tarball: {
        content_type: string;
        data: Buffer;
    };
};
//# sourceMappingURL=extract-package-data.d.ts.map