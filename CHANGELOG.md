# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.10.0](https://github.com/emeralt/emeralt/compare/v0.9.0...v0.10.0) (2019-04-02)


### Features

* **server:** make initial healthcheck optional, update readme ([91de6db](https://github.com/emeralt/emeralt/commit/91de6db))
* add @emeralt/database-cloud-datastore ([#125](https://github.com/emeralt/emeralt/issues/125)) ([7866ee3](https://github.com/emeralt/emeralt/commit/7866ee3))





# Version [](https://github.com/emeralt/emeralt/compare/v0.9.0...v) (2019-04-02)


### chore

* bump @types/node from 11.11.7 to 11.12.0 (#122) ([70076ee](https://github.com/emeralt/emeralt/commit/70076ee)), closes [#122](https://github.com/emeralt/emeralt/issues/122) (dependabot[bot])
* bump @types/node from 11.12.0 to 11.12.2 (#126) ([67b1ae3](https://github.com/emeralt/emeralt/commit/67b1ae3)), closes [#126](https://github.com/emeralt/emeralt/issues/126) (dependabot[bot])
* bump @types/node from 11.12.2 to 11.13.0 (#128) ([d4b96d4](https://github.com/emeralt/emeralt/commit/d4b96d4)), closes [#128](https://github.com/emeralt/emeralt/issues/128) (dependabot[bot])
* bump ava from 1.4.0 to 1.4.1 (#123) ([fb7954f](https://github.com/emeralt/emeralt/commit/fb7954f)), closes [#123](https://github.com/emeralt/emeralt/issues/123) (dependabot[bot])
* bump typescript from 3.3.4000 to 3.4.1 (#127) ([bc143b6](https://github.com/emeralt/emeralt/commit/bc143b6)), closes [#127](https://github.com/emeralt/emeralt/issues/127) (dependabot[bot])
* move changelog script to preversion hook ([1402a42](https://github.com/emeralt/emeralt/commit/1402a42)) ( Ilya Atamas)
* move server types from @emeralt/types to @emeralt/server ([4a9db21](https://github.com/emeralt/emeralt/commit/4a9db21)) ( Ilya Atamas)
* update changelog ([0a49e42](https://github.com/emeralt/emeralt/commit/0a49e42)) (Ilya Atamas)

### ci

* exclude datastore from coverage ([418942d](https://github.com/emeralt/emeralt/commit/418942d)) ( Ilya Atamas)

### feat

* add @emeralt/database-cloud-datastore (#125) ([7866ee3](https://github.com/emeralt/emeralt/commit/7866ee3)), closes [#125](https://github.com/emeralt/emeralt/issues/125) (Ilya Atamas)



# Version [0.9.0](https://github.com/emeralt/emeralt/compare/v0.8.0...v0.9.0) (2019-03-26)


### chore

* bump @types/node from 11.11.5 to 11.11.6 (#115) ([77041ba](https://github.com/emeralt/emeralt/commit/77041ba)), closes [#115](https://github.com/emeralt/emeralt/issues/115) (dependabot[bot])
* bump @types/node from 11.11.6 to 11.11.7 (#119) ([f3d9b32](https://github.com/emeralt/emeralt/commit/f3d9b32)), closes [#119](https://github.com/emeralt/emeralt/issues/119) (dependabot[bot])
* bump @types/ramda from 0.26.4 to 0.26.5 (#117) ([fe83fe6](https://github.com/emeralt/emeralt/commit/fe83fe6)), closes [#117](https://github.com/emeralt/emeralt/issues/117) (dependabot[bot])
* bump ava from 1.3.1 to 1.4.0 (#116) ([8c44380](https://github.com/emeralt/emeralt/commit/8c44380)), closes [#116](https://github.com/emeralt/emeralt/issues/116) (dependabot[bot])
* bump ioredis from 4.6.2 to 4.9.0 (#118) ([fe1ef1b](https://github.com/emeralt/emeralt/commit/fe1ef1b)), closes [#118](https://github.com/emeralt/emeralt/issues/118) (dependabot[bot])
* bump mongodb from 3.2.1 to 3.2.2 (#114) ([328e761](https://github.com/emeralt/emeralt/commit/328e761)), closes [#114](https://github.com/emeralt/emeralt/issues/114) (dependabot[bot])
* update lerna config, enable conventional changelog ([4775c9e](https://github.com/emeralt/emeralt/commit/4775c9e)) ( stackdumper)

### refactor

* remake storage plugins to use streams (#113) ([d8df81a](https://github.com/emeralt/emeralt/commit/d8df81a)), closes [#113](https://github.com/emeralt/emeralt/issues/113) (Ilya Atamas)

### test

* extend tests for cli and auth-inmemory ([3591693](https://github.com/emeralt/emeralt/commit/3591693)) ( Ilya Atamas)



# Version [0.8.0](https://github.com/emeralt/emeralt/compare/v0.7.1...v0.8.0) (2019-03-22)


### chore

* bump @google-cloud/firestore from 1.1.0 to 1.2.0 (#108) ([26c15bd](https://github.com/emeralt/emeralt/commit/26c15bd)), closes [#108](https://github.com/emeralt/emeralt/issues/108) (dependabot[bot])
* bump @types/node from 11.11.3 to 11.11.5 (#109) ([ab02fbd](https://github.com/emeralt/emeralt/commit/ab02fbd)), closes [#109](https://github.com/emeralt/emeralt/issues/109) (dependabot[bot])
* bump @types/node-fetch from 2.1.6 to 2.1.7 (#106) ([69efcb3](https://github.com/emeralt/emeralt/commit/69efcb3)), closes [#106](https://github.com/emeralt/emeralt/issues/106) (dependabot[bot])
* bump @types/ramda from 0.26.3 to 0.26.4 (#110) ([68672b3](https://github.com/emeralt/emeralt/commit/68672b3)), closes [#110](https://github.com/emeralt/emeralt/issues/110) (dependabot[bot])
* bump compression from 1.7.3 to 1.7.4 (#102) ([0b37d24](https://github.com/emeralt/emeralt/commit/0b37d24)), closes [#102](https://github.com/emeralt/emeralt/issues/102) (dependabot[bot])
* bump jsonwebtoken from 8.5.0 to 8.5.1 (#103) ([5fd22cf](https://github.com/emeralt/emeralt/commit/5fd22cf)), closes [#103](https://github.com/emeralt/emeralt/issues/103) (dependabot[bot])
* bump mongodb from 3.1.13 to 3.2.1 (#107) ([cc7dd31](https://github.com/emeralt/emeralt/commit/cc7dd31)), closes [#107](https://github.com/emeralt/emeralt/issues/107) (dependabot[bot])
* bump supertest from 4.0.0 to 4.0.2 (#100) ([8402cc7](https://github.com/emeralt/emeralt/commit/8402cc7)), closes [#100](https://github.com/emeralt/emeralt/issues/100) (dependabot[bot])
* bump typescript from 3.3.3 to 3.3.4000 (#104) ([f37ef33](https://github.com/emeralt/emeralt/commit/f37ef33)), closes [#104](https://github.com/emeralt/emeralt/issues/104) (dependabot[bot])
* remove renovate.json ([d4642e1](https://github.com/emeralt/emeralt/commit/d4642e1)) ( stackdumper)

### ci

* add coverage report ([4ecc34a](https://github.com/emeralt/emeralt/commit/4ecc34a)) ( stackdumper)

### feat

* add dist-tags support (#101) ([407b6c0](https://github.com/emeralt/emeralt/commit/407b6c0)), closes [#101](https://github.com/emeralt/emeralt/issues/101) (Ilya Atamas)



## Version [0.7.1](https://github.com/emeralt/emeralt/compare/v0.7.0...v0.7.1) (2019-03-16)


### ci

* fix pipeline ([fa42b99](https://github.com/emeralt/emeralt/commit/fa42b99)) ( stackdumper)
* multistage pipeline (#99) ([b155228](https://github.com/emeralt/emeralt/commit/b155228)), closes [#99](https://github.com/emeralt/emeralt/issues/99) (Ilya Atamas)



# Version [0.7.0](https://github.com/emeralt/emeralt/compare/v0.6.2...v0.7.0) (2019-03-15)


### chore

* bump @google-cloud/firestore from 1.0.2 to 1.1.0 (#90) ([1d828f0](https://github.com/emeralt/emeralt/commit/1d828f0)), closes [#90](https://github.com/emeralt/emeralt/issues/90) (dependabot[bot])
* bump @google-cloud/storage from 2.4.2 to 2.4.3 (#97) ([600afce](https://github.com/emeralt/emeralt/commit/600afce)), closes [#97](https://github.com/emeralt/emeralt/issues/97) (dependabot[bot])
* bump @types/ioredis from 4.0.9 to 4.0.10 (#92) ([935ef69](https://github.com/emeralt/emeralt/commit/935ef69)), closes [#92](https://github.com/emeralt/emeralt/issues/92) (dependabot[bot])
* bump @types/mongodb from 3.1.21 to 3.1.22 (#87) ([2efae0c](https://github.com/emeralt/emeralt/commit/2efae0c)), closes [#87](https://github.com/emeralt/emeralt/issues/87) (dependabot[bot])
* bump @types/node from 11.10.5 to 11.11.3 (#93) ([d5670af](https://github.com/emeralt/emeralt/commit/d5670af)), closes [#93](https://github.com/emeralt/emeralt/issues/93) (dependabot[bot])
* bump @types/ramda from 0.25.51 to 0.26.3 (#89) ([ad25598](https://github.com/emeralt/emeralt/commit/ad25598)), closes [#89](https://github.com/emeralt/emeralt/issues/89) (dependabot[bot])
* bump gemcart from 1.0.0 to 1.1.0 (#94) ([ece2093](https://github.com/emeralt/emeralt/commit/ece2093)), closes [#94](https://github.com/emeralt/emeralt/issues/94) (dependabot[bot])
* bump gemcart from 1.1.0 to 1.1.1 ([dc796f9](https://github.com/emeralt/emeralt/commit/dc796f9)) ( stackdumper)
* bump supertest from 3.4.2 to 4.0.0 (#88) ([a79f7f3](https://github.com/emeralt/emeralt/commit/a79f7f3)), closes [#88](https://github.com/emeralt/emeralt/issues/88) (dependabot[bot])

### docs

* update and extend docs (#95) ([a67b04d](https://github.com/emeralt/emeralt/commit/a67b04d)), closes [#95](https://github.com/emeralt/emeralt/issues/95) (Ilya Atamas)

### feat

* add database-localfs (#96) ([a43392d](https://github.com/emeralt/emeralt/commit/a43392d)), closes [#96](https://github.com/emeralt/emeralt/issues/96) (Ilya Atamas)



## Version [0.6.2](https://github.com/emeralt/emeralt/compare/v0.6.1...v0.6.2) (2019-03-10)




## Version [0.6.1](https://github.com/emeralt/emeralt/compare/v0.6.0...v0.6.1) (2019-03-09)


### chore

* bump @types/jsonwebtoken from 8.3.1 to 8.3.2 (#82) ([c269ee8](https://github.com/emeralt/emeralt/commit/c269ee8)), closes [#82](https://github.com/emeralt/emeralt/issues/82) (dependabot[bot])
* bump @types/mongodb from 3.1.20 to 3.1.21 (#81) ([bc5f4c2](https://github.com/emeralt/emeralt/commit/bc5f4c2)), closes [#81](https://github.com/emeralt/emeralt/issues/81) (dependabot[bot])
* bump @types/node from 11.10.4 to 11.10.5 (#75) ([d7f5342](https://github.com/emeralt/emeralt/commit/d7f5342)), closes [#75](https://github.com/emeralt/emeralt/issues/75) (dependabot[bot])



# Version [0.6.0](https://github.com/emeralt/emeralt/compare/v0.5.0...v0.6.0) (2019-03-07)


### chore

* bump @google-cloud/firestore from 1.0.1 to 1.0.2 (#74) ([48fb387](https://github.com/emeralt/emeralt/commit/48fb387)), closes [#74](https://github.com/emeralt/emeralt/issues/74) (dependabot[bot])
* bump @types/ioredis from 4.0.8 to 4.0.9 (#68) ([8b6b0d1](https://github.com/emeralt/emeralt/commit/8b6b0d1)), closes [#68](https://github.com/emeralt/emeralt/issues/68) (dependabot[bot])
* bump @types/jsonwebtoken from 8.3.0 to 8.3.1 (#77) ([2444e23](https://github.com/emeralt/emeralt/commit/2444e23)), closes [#77](https://github.com/emeralt/emeralt/issues/77) (dependabot[bot])
* bump @types/node from 11.9.4 to 11.9.6 (#69) ([b2e2033](https://github.com/emeralt/emeralt/commit/b2e2033)), closes [#69](https://github.com/emeralt/emeralt/issues/69) (dependabot[bot])
* bump @types/node from 11.9.6 to 11.10.4 (#70) ([c0541d1](https://github.com/emeralt/emeralt/commit/c0541d1)), closes [#70](https://github.com/emeralt/emeralt/issues/70) (dependabot[bot])
* bump @types/ramda from 0.25.50 to 0.25.51 (#66) ([e40a93d](https://github.com/emeralt/emeralt/commit/e40a93d)), closes [#66](https://github.com/emeralt/emeralt/issues/66) (dependabot[bot])
* bump ava from 1.2.1 to 1.3.1 (#73) ([f550cd9](https://github.com/emeralt/emeralt/commit/f550cd9)), closes [#73](https://github.com/emeralt/emeralt/issues/73) (dependabot[bot])
* bump coveralls from 3.0.2 to 3.0.3 (#65) ([a3f72eb](https://github.com/emeralt/emeralt/commit/a3f72eb)), closes [#65](https://github.com/emeralt/emeralt/issues/65) (dependabot[bot])
* bump lerna from 3.13.0 to 3.13.1 (#67) ([889fba9](https://github.com/emeralt/emeralt/commit/889fba9)), closes [#67](https://github.com/emeralt/emeralt/issues/67) (dependabot[bot])
* bump ts-node from 8.0.2 to 8.0.3 (#76) ([8ad0af9](https://github.com/emeralt/emeralt/commit/8ad0af9)), closes [#76](https://github.com/emeralt/emeralt/issues/76) (dependabot[bot])

### ci

* fix .travis.yaml ([8268031](https://github.com/emeralt/emeralt/commit/8268031)) ( stackdumper)

### feat

* add database-mongodb (#71) ([85df6d2](https://github.com/emeralt/emeralt/commit/85df6d2)), closes [#71](https://github.com/emeralt/emeralt/issues/71) (Viacheslav Yefremov)



# Version [0.5.0](https://github.com/emeralt/emeralt/compare/v0.4.1...v0.5.0) (2019-02-23)


### chore

* add github links to package.json-s ([47acf90](https://github.com/emeralt/emeralt/commit/47acf90)) (stackdumper)

### feat

* implement healthcheck on /-/sys/healthz endpoint (#62) ([78abd37](https://github.com/emeralt/emeralt/commit/78abd37)), closes [#62](https://github.com/emeralt/emeralt/issues/62) (Ilya Atamas)

### test

* extend tests for storage, cleanup deps ([b983a9a](https://github.com/emeralt/emeralt/commit/b983a9a)) (stackdumper)



## Version [0.4.1](https://github.com/emeralt/emeralt/compare/v0.4.0...v0.4.1) (2019-02-21)


### test

* add database tests for scoped packages ([c1cee74](https://github.com/emeralt/emeralt/commit/c1cee74)) (stackdumper)



# Version [0.4.0](https://github.com/emeralt/emeralt/compare/v0.3.1...v0.4.0) (2019-02-21)


### chore

* bump @types/ioredis from 4.0.6 to 4.0.7 (#48) ([5a0ede1](https://github.com/emeralt/emeralt/commit/5a0ede1)), closes [#48](https://github.com/emeralt/emeralt/issues/48) (dependabot[bot])
* bump @types/ioredis from 4.0.7 to 4.0.8 (#55) ([3dda2af](https://github.com/emeralt/emeralt/commit/3dda2af)), closes [#55](https://github.com/emeralt/emeralt/issues/55) (dependabot[bot])
* bump jsonwebtoken from 8.4.0 to 8.5.0 (#53) ([4b0a577](https://github.com/emeralt/emeralt/commit/4b0a577)), closes [#53](https://github.com/emeralt/emeralt/issues/53) (dependabot[bot])
* bump npm-packlist from 1.4.0 to 1.4.1 (#54) ([3869fcc](https://github.com/emeralt/emeralt/commit/3869fcc)), closes [#54](https://github.com/emeralt/emeralt/issues/54) (dependabot[bot])

### docs

* add @emeralt/database-cloud-firestore to readme ([3aa5b51](https://github.com/emeralt/emeralt/commit/3aa5b51)) (stackdumper)
* update plugins readmes ([cd91456](https://github.com/emeralt/emeralt/commit/cd91456)) (stackdumper)

### feat

* add @emrealt/database-cloud-firestore ([d525271](https://github.com/emeralt/emeralt/commit/d525271)) (stackdumper)



## Version [0.3.1](https://github.com/emeralt/emeralt/compare/v0.3.0...v0.3.1) (2019-02-19)


### chore

* version bump ([b89e413](https://github.com/emeralt/emeralt/commit/b89e413)) (stackdumper)



# Version [0.3.0](https://github.com/emeralt/emeralt/compare/v0.3.0-alpha.0...v0.3.0) (2019-02-19)


### chore

* flatten project structure ([28b2a24](https://github.com/emeralt/emeralt/commit/28b2a24)) (stackdumper)
* remove @emeralt/bundler and use gemcart instead ([88e7144](https://github.com/emeralt/emeralt/commit/88e7144)) (stackdumper)

### docs

* extend readmes ([0d817b5](https://github.com/emeralt/emeralt/commit/0d817b5)) (stackdumper)
* fix link to logo in readme ([e3dbdcb](https://github.com/emeralt/emeralt/commit/e3dbdcb)) (stackdumper)
* fixes ([7a84f8e](https://github.com/emeralt/emeralt/commit/7a84f8e)) (Ilya Atamas)
* update readme.md ([1d6a17f](https://github.com/emeralt/emeralt/commit/1d6a17f)) (Ilya Atamas)

### feat

* add database-redis ([60b6f83](https://github.com/emeralt/emeralt/commit/60b6f83)) (stackdumper)
* add method dropData to all plugins ([2181ed1](https://github.com/emeralt/emeralt/commit/2181ed1)) (stackdumper)

### refactor

* rewrite plugins API, remove database-redis ([3411e17](https://github.com/emeralt/emeralt/commit/3411e17)) (stackdumper)



# Version [0.3.0-alpha.0](https://github.com/emeralt/emeralt/compare/v0.2.2...v0.3.0-alpha.0) (2019-01-22)


### feat

* add storage localfs and gcs ([e7bb74a](https://github.com/emeralt/emeralt/commit/e7bb74a)) (stackdumper)



## Version [0.2.2](https://github.com/emeralt/emeralt/compare/v0.2.1...v0.2.2) (2019-01-22)




## Version [0.2.1](https://github.com/emeralt/emeralt/compare/v0.2.0...v0.2.1) (2019-01-22)




# Version [0.2.0](https://github.com/emeralt/emeralt/compare/v0.1.1...v0.2.0) (2019-01-16)


### chore

* move nyc config from package.json to .nycrc.json ([419f5a8](https://github.com/emeralt/emeralt/commit/419f5a8)) (stackdumper)
* rename LICENSE to license ([8ffc11d](https://github.com/emeralt/emeralt/commit/8ffc11d)) (Ilya Atamas)
* rename LICENSE-assets to license-assets ([d5ccd4c](https://github.com/emeralt/emeralt/commit/d5ccd4c)) (Ilya Atamas)
* rename README.md to readme.md ([3c70c2b](https://github.com/emeralt/emeralt/commit/3c70c2b)) (Ilya Atamas)

### docs

* adjust readmes ([52a97bc](https://github.com/emeralt/emeralt/commit/52a97bc)) (stackdumper)

### feat

* add @emeralt/database-redis ([8c45a00](https://github.com/emeralt/emeralt/commit/8c45a00)) (stackdumper)

### fix

* add missing awaits ([60d8c4f](https://github.com/emeralt/emeralt/commit/60d8c4f)) (stackdumper)



## Version [0.1.1](https://github.com/emeralt/emeralt/compare/v0.1.0...v0.1.1) (2019-01-14)




# Version [0.1.0](https://github.com/emeralt/emeralt/compare/v0.0.19...v0.1.0) (2019-01-14)


### feat

* allow plugins to return a promise initializer ([a4cdbe4](https://github.com/emeralt/emeralt/commit/a4cdbe4)) (stackdumper)
* rewrite and enhance plugins api ([1a10cd6](https://github.com/emeralt/emeralt/commit/1a10cd6)) (stackdumper)
* rewrite plugins system, increase test coverage ([781e2bb](https://github.com/emeralt/emeralt/commit/781e2bb)) (stackdumper)

### test

* fix tests type errors ([8657e65](https://github.com/emeralt/emeralt/commit/8657e65)) (stackdumper)



## Version [0.0.19](https://github.com/emeralt/emeralt/compare/v0.0.18...v0.0.19) (2019-01-13)


### chore

* add format on precommit ([3617c8e](https://github.com/emeralt/emeralt/commit/3617c8e)) (stackdumper)
* change output path, remove tests from builds ([634d91f](https://github.com/emeralt/emeralt/commit/634d91f)) (stackdumper)
* exclude bundler from coverage reports ([983ee9a](https://github.com/emeralt/emeralt/commit/983ee9a)) (stackdumper)
* remove semicolons from exit statements ([cf62be3](https://github.com/emeralt/emeralt/commit/cf62be3)) (stackdumper)

### docs

* fix readme links ([bc397e4](https://github.com/emeralt/emeralt/commit/bc397e4)) (stackdumper)
* update readme ([d439d50](https://github.com/emeralt/emeralt/commit/d439d50)) (stackdumper)
* update readme and licenses ([8a68042](https://github.com/emeralt/emeralt/commit/8a68042)) (stackdumper)
* update README badges ([5ab1a39](https://github.com/emeralt/emeralt/commit/5ab1a39)) (stackdumper)

### feat

* add @emeralt/utils ([3afc233](https://github.com/emeralt/emeralt/commit/3afc233)) (stackdumper)
* add database types and database-inmemory ([049852a](https://github.com/emeralt/emeralt/commit/049852a)) (stackdumper)
* move token issuance from auth plugins to server ([68d71a7](https://github.com/emeralt/emeralt/commit/68d71a7)) (stackdumper)
* publish package (#14) ([fb914f0](https://github.com/emeralt/emeralt/commit/fb914f0)), closes [#14](https://github.com/emeralt/emeralt/issues/14) (Ilya Atamas)

### fix

* enable typescript for tests ([3bc0c49](https://github.com/emeralt/emeralt/commit/3bc0c49)) (stackdumper)
* use lerna workspaces ([5411efa](https://github.com/emeralt/emeralt/commit/5411efa)) (stackdumper)

### refactor

* cleanup ([d0de01f](https://github.com/emeralt/emeralt/commit/d0de01f)) (stackdumper)
* cleanup, restructure ([54a45b7](https://github.com/emeralt/emeralt/commit/54a45b7)) (stackdumper)
* remove @emeralt/utils ([c11efff](https://github.com/emeralt/emeralt/commit/c11efff)) (stackdumper)



## Version [0.0.18](https://github.com/emeralt/emeralt/compare/v0.0.17...v0.0.18) (2019-01-06)


### fix

* .npmignore paths ([88e5d60](https://github.com/emeralt/emeralt/commit/88e5d60)) (stackdumper)



## Version [0.0.17](https://github.com/emeralt/emeralt/compare/v0.0.16...v0.0.17) (2019-01-06)




## Version [0.0.16](https://github.com/emeralt/emeralt/compare/v0.0.15...v0.0.16) (2019-01-06)


### chore

* include tests to compilation but exclude from build ([f517795](https://github.com/emeralt/emeralt/commit/f517795)) (stackdumper)
* move endpoints from emeralt-types to emeralt-server/constants ([9dc4b19](https://github.com/emeralt/emeralt/commit/9dc4b19)) (stackdumper)

### ci

* add .npmignore ([4bd7b0a](https://github.com/emeralt/emeralt/commit/4bd7b0a)) (stackdumper)
* attempt to fix ([104a293](https://github.com/emeralt/emeralt/commit/104a293)) (stackdumper)
* exclude Node.js 6 from test ([69439da](https://github.com/emeralt/emeralt/commit/69439da)) (stackdumper)
* move cli to packages and switch to microbundle ([61fc9b1](https://github.com/emeralt/emeralt/commit/61fc9b1)) (stackdumper)
* remove deploy ([c5ba10f](https://github.com/emeralt/emeralt/commit/c5ba10f)) (stackdumper)
* revert multistage pipeline ([1c72f3b](https://github.com/emeralt/emeralt/commit/1c72f3b)) (stackdumper)
* use multistage pipeline ([db2d3df](https://github.com/emeralt/emeralt/commit/db2d3df)) (stackdumper)



## Version [0.0.15](https://github.com/emeralt/emeralt/compare/v0.0.14...v0.0.15) (2018-12-28)


### build

* optimize build, use cache ([e1444a8](https://github.com/emeralt/emeralt/commit/e1444a8)) (stackdumper)
* tune max memory limit for node ([ad12fa4](https://github.com/emeralt/emeralt/commit/ad12fa4)) (stackdumper)
* use child process for watch ([a858942](https://github.com/emeralt/emeralt/commit/a858942)) (stackdumper)

### chore

* refactor types, add package types ([965988c](https://github.com/emeralt/emeralt/commit/965988c)) (stackdumper)

### ci

* add deploy ([b456176](https://github.com/emeralt/emeralt/commit/b456176)) (stackdumper)
* fix native dependencies build ([7641163](https://github.com/emeralt/emeralt/commit/7641163)) (stackdumper)
* remove addons from travis config ([27d7c07](https://github.com/emeralt/emeralt/commit/27d7c07)) (stackdumper)
* set public access for packages ([2291c7c](https://github.com/emeralt/emeralt/commit/2291c7c)) (stackdumper)

### fix

* exclude tests from build ([f11fb56](https://github.com/emeralt/emeralt/commit/f11fb56)) (stackdumper)



## Version [0.0.14](https://github.com/emeralt/emeralt/compare/v0.0.13...v0.0.14) (2018-12-27)


### test

* extend tests and fix minor bugs ([58a748d](https://github.com/emeralt/emeralt/commit/58a748d)) (stackdumper)



## Version [0.0.13](https://github.com/emeralt/emeralt/compare/v0.0.12...v0.0.13) (2018-12-26)




## Version [0.0.12](https://github.com/emeralt/emeralt/compare/v0.0.11...v0.0.12) (2018-12-26)


### chore

* add watch and start commands ([5a39561](https://github.com/emeralt/emeralt/commit/5a39561)) (stackdumper)
* clean script using "git clean" ([6218db0](https://github.com/emeralt/emeralt/commit/6218db0)) (stackdumper)
* enable cache for builder ([2bb518a](https://github.com/emeralt/emeralt/commit/2bb518a)) (stackdumper)
* handle errors when watching ([f98a67c](https://github.com/emeralt/emeralt/commit/f98a67c)) (stackdumper)
* move all types to @emeralt/types ([45b7ed7](https://github.com/emeralt/emeralt/commit/45b7ed7)) (stackdumper)
* remove clean action from cli ([95f45fd](https://github.com/emeralt/emeralt/commit/95f45fd)) (stackdumper)

### ci

* another attempt to fix coverage reports ([d14e508](https://github.com/emeralt/emeralt/commit/d14e508)) (stackdumper)
* fix coverage reports ([651fded](https://github.com/emeralt/emeralt/commit/651fded)) (stackdumper)
* update build order ([f399b5f](https://github.com/emeralt/emeralt/commit/f399b5f)) (stackdumper)

### feat

* add login support, add auth-inmemory ([af6d109](https://github.com/emeralt/emeralt/commit/af6d109)) (stackdumper)



## Version [0.0.11](https://github.com/emeralt/emeralt/compare/v0.0.10...v0.0.11) (2018-12-26)


### ci

* setup commitlint ([a95a690](https://github.com/emeralt/emeralt/commit/a95a690)) (stackdumper)

### docs

* add "under constructioon" warning ([caa0eac](https://github.com/emeralt/emeralt/commit/caa0eac)) (stackdumper)
* add open issues badge to readme ([5d69261](https://github.com/emeralt/emeralt/commit/5d69261)) (stackdumper)

### feat

* generate declaration files ([47e766c](https://github.com/emeralt/emeralt/commit/47e766c)) (stackdumper)

### test

* use shared root ava config ([9c45532](https://github.com/emeralt/emeralt/commit/9c45532)) (stackdumper)



## Version [0.0.10](https://github.com/emeralt/emeralt/compare/v0.0.9...v0.0.10) (2018-12-22)




## Version [0.0.9](https://github.com/emeralt/emeralt/compare/v0.0.8...v0.0.9) (2018-12-22)




## Version [0.0.8](https://github.com/emeralt/emeralt/compare/v0.0.7...v0.0.8) (2018-12-22)




## Version [0.0.7](https://github.com/emeralt/emeralt/compare/v0.0.6...v0.0.7) (2018-12-22)




## Version [0.0.6](https://github.com/emeralt/emeralt/compare/v0.0.5...v0.0.6) (2018-12-22)




## Version [0.0.5](https://github.com/emeralt/emeralt/compare/v0.0.4...v0.0.5) (2018-12-22)




## Version [0.0.4](https://github.com/emeralt/emeralt/compare/v0.0.3...v0.0.4) (2018-12-22)




## Version [0.0.3](https://github.com/emeralt/emeralt/compare/v0.0.2...v0.0.3) (2018-12-22)




## Version 0.0.2 (2018-12-22)
