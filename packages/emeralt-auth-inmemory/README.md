# @emeralt/auth-inmemory
Emeralt auth plugin to store users in memory

## Install

Using npm:

```sh
npm install @emeralt/auth-inmemory
```

or using yarn:

```sh
yarn add @emeralt/auth-inmemory
```

## Usage

```ts
new EmeraltAuthInMemory({
  users: [{
    username: 'emeralt',
    password: 'emeralt',
    admin: true,
  }]
})
```
