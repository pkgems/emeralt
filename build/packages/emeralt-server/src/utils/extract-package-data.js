/* remove version and attachments from package */
const extractMetadata = (pkg) => {
    const copy = Object.assign({}, pkg);
    delete copy.version;
    delete copy._attachments;
    return copy;
};
/* remove first of versions array with modified tarball url */
const extractVersion = (pkg) => {
    const version = Object.values(pkg.versions).shift();
    const encodedName = encodeURIComponent(version.name);
    const encodedVersion = encodeURIComponent(version.version);
    // TODO: get address from config
    // version.dist.tarball = `http://localhost:8080/-/tarball/${encodedName}/${encodedVersion}`
    return version;
};
const extractTarball = (pkg) => {
    const tarball = Object.values(pkg._attachments)[0];
    tarball.data =
        typeof tarball.data === 'string'
            ? Buffer.from(tarball.data, 'base64')
            : tarball.data;
    return tarball;
};
export const extractPackageData = (pkg) => ({
    metadata: extractMetadata(pkg),
    version: extractVersion(pkg),
    tarball: extractTarball(pkg),
});
