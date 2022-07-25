# etude-enoden

<!-- Badges -->
[![Last Commit](https://img.shields.io/github/last-commit/shin-sforzando/etude-enoden)](https://github.com/shin-sforzando/etude-enoden/graphs/commit-activity)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

<!-- Screenshots -->
| ![Screenshot 1](https://placehold.jp/32/3d4070/ffffff/720x480.png?text=Screenshot%201) | ![Screenshot 2](https://placehold.jp/32/703d40/ffffff/720x480.png?text=Screenshot%202) |
|:--------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------:|
|                                      Screenshot 1                                      |                                      Screenshot 2                                      |

<!-- Synopsis -->
Etude of QR code stamp rally using LIFF.

<!-- TOC -->
- [Prerequisites](#prerequisites)
- [How to](#how-to)
  - [Handle Secrets](#handle-secrets)
  - [Develop](#develop)
  - [Document](#document)
    - [CHANGELOG](#changelog)
  - [Deploy](#deploy)
- [Misc](#misc)
- [Notes](#notes)
  - [LICENSE](#license)
  - [Contributors](#contributors)

## Prerequisites

- Node.js
  - Production Dependencies
    - (T. B. D.)
  - Development Dependencies
    - (T. B. D.)
- [git-secret](https://git-secret.io/) as *Secret File Manager*
- [direnv](https://direnv.net) as *`.env` Loader*

## How to

### Handle Secrets

To install [git-secret](https://git-secret.io/) via [Homebrew](https://brew.sh) manually, `brew install git-secret`.
To install [direnv](https://direnv.net) via [Homebrew](https://brew.sh) manually, `brew install direnv`.

Developers who share a GPG key with their team can decrypt confidential information.

To reveal the secret information (= `*.secrets`), run `make reveal`.

If there are `.env` -like files included in `*.secrets`, [direnv](https://direnv.net) try to load them automatically.
`direnv allow` to approve it.

On the other hand, to encrypt the updated secret information, run `make hide`.

### Develop

```shell
make dev
```

### Document

#### CHANGELOG

To install [git-cliff](https://github.com/orhun/git-cliff) via [Homebrew](https://brew.sh) manually, `brew install git-cliff`.

To update `CHANGELOG.md` manually, run [git-cliff](https://github.com/orhun/git-cliff) like below.

```shell
git cliff --output CHANGELOG.md
```

### Deploy

(T. B. D.)

## Misc

## Notes

This repository is [Commitizen](https://commitizen.github.io/cz-cli/) friendly, following [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow).
See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### LICENSE

See [LICENSE](LICENSE).

### Contributors

- [sforzando LLC. and Inc.](https://sforzando.co.jp/)
  - [Shin'ichiro Suzuki](https://github.com/shin-sforzando)
