// FIXME:
// import argon from 'argon2'
// import crypto from 'crypto'
// import { cpus } from 'os'

// const cpusLength = cpus().length

// export const encrypt = (password: string) =>
//   argon.hash(password, {
//     type: argon.argon2id,
//     salt: crypto.randomBytes(128),
//     parallelism: cpusLength,
//     timeCost: 3,
//   })

// export const compare = (hash: string, password: string) =>
//   argon.verify(hash, password)

import bcrypt from 'bcryptjs'

export const hash = (password: string) => bcrypt.hash(password, 10)

export const compare = (password: string, hash: string) =>
  bcrypt.compare(password, hash)
