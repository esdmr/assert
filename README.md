# Assert

[![GitHub workflow](https://img.shields.io/github/workflow/status/esdmr/assert/CI/master?label=test&labelColor=0F0F0F&logo=github)][workflow]
[![Codecov coverage](https://img.shields.io/codecov/c/gh/esdmr/assert/master?labelColor=0F0F0F&logo=CodeCov&logoColor=FF66B0)][codecov]
[![License](https://img.shields.io/github/license/esdmr/assert?labelColor=0F0F0F&color=005C9A)][license]
[![Documentation](https://img.shields.io/badge/documentation-005C9A)][gh-pages]
[![NodeJS version](https://img.shields.io/badge/node-≥16-005C9A?labelColor=0F0F0F&logo=node.js&logoColor=00B834)][node]
[![pnpm version](https://img.shields.io/badge/pnpm-via%20corepack-005C9A?labelColor=0F0F0F&logo=pnpm)][pnpm]

[workflow]: https://github.com/esdmr/assert/actions/workflows/ci.yml
[codecov]: https://codecov.io/gh/esdmr/assert
[license]: https://github.com/esdmr/assert/blob/master/LICENSE
[gh-pages]: https://esdmr.github.io/assert/
[node]: https://nodejs.org/en/download/current
[pnpm]: https://pnpm.io

Assertion library for JavaScript.

## Installing as a dependency

This project requires [Node.JS][node] version 16 minimum. Ensure that you have
installed the correct version of Node.JS by running `node --version`.

Any of the following snippets will install this project as a dependency:

```sh
npm install --save @esdmr/assert
# Or
yarn add @esdmr/assert
# Or
pnpm install @esdmr/assert
```

## Installing from source

This project requires [Node.JS][node] version 16 minimum. Ensure that you have
installed the correct version of Node.JS by running `node --version`.

The following snippet will download, install, and build the source from GitHub:

```sh
git clone https://github.com/esdmr/assert.git
cd assert
corepack pnpm install
corepack pnpm run build
```
