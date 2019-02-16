# @emeralt/auth-inmemory
Emeralt auth plugin to store users in memory

## Install

Using npm:

```sh
npm install --save-dev @emeralt/auth-inmemory
```

or using yarn:

```sh
yarn add --dev @emeralt/auth-inmemory
```

## Usage

```ts
new EmeraltAuthInMemory({
  users: {
    username: 'password',
  }
})
```
