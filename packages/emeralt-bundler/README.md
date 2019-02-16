# @emeralt/bundler
The small wrapper around Microbundle intended to build other Emeralt packages

## Install

Using npm:

```sh
npm install --save-dev @emeralt/bundler
```

or using yarn:

```sh
yarn add --dev @emeralt/bundler
```

### Build
```sh
bundler build
```

### Watch
```sh
bundler watch
```

#### Options

- `-c, --cwd <path>` - Set workdir
- `-m, --minify` - Minify output
- `-s, --sourceMap` - Generate sourcemap
- `-i, --includeDependencies` - Include dependencies into bundle
