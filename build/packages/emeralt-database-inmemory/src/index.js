class CEmeraltDatabaseInMemory {
    constructor() {
        this.storage = {
            metadata: {},
            versions: {},
        };
    }
    getMetadatas() {
        return Object.assign({}, this.storage.metadata);
    }
    hasMetadata(name) {
        return Boolean(this.getMetadata(name));
    }
    getMetadata(name) {
        return this.storage.metadata[name];
    }
    putMetadata(name, data) {
        this.storage.metadata[name] = data;
    }
    getVersions(name) {
        return this.storage.versions[name] || {};
    }
    hasVersion(name, version) {
        return Boolean(this.getVersions(name)[version]);
    }
    getVersion(name, version) {
        return this.getVersions(name)[version];
    }
    putVersion(name, version, data) {
        const versions = this.getVersions(name);
        versions[version] = data;
        this.storage.versions[name] = versions;
    }
    dropData() {
        this.storage = {
            metadata: {},
            versions: {},
        };
    }
    healthz() {
        return { ok: true };
    }
}
export const EmeraltDatabaseInMemory = () => () => new CEmeraltDatabaseInMemory();
