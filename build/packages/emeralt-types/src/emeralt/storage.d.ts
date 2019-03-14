/// <reference types="node" />
import { OptionalPromise } from '../helpers';
import { TEmeraltServerConfig } from './server';
import { CEmeraltDatabase } from './database';
import { Readable } from 'stream';
import { CEmeraltPlugin } from './plugin';
export interface CEmeraltStorage extends CEmeraltPlugin {
    getTarball(name: string, version: string): OptionalPromise<Readable>;
    putTarball(name: string, version: string, tarball: Buffer): OptionalPromise<any>;
    /** drop all data (used for test purposes) */
    dropData(): OptionalPromise<any>;
}
export interface IEmeraltStorage<C = {}> {
    (pluginConfig: C): (serverConfig: TEmeraltServerConfig, database: CEmeraltDatabase) => OptionalPromise<CEmeraltStorage>;
}
//# sourceMappingURL=storage.d.ts.map