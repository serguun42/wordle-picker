# Wordle Picker

[Picker for Wordle game](https://wordle-picker.serguun42.ru/) built with React 18. Based on [Cacher-Frontend-React](https://github.com/serguun42/cacher-frontend-react).

## Configuration, building and launching

All configuration, npm and webpack scripts are modified ones from `react-scripts eject` with specific purposes of this project.

### Commands

- `npm i --production` – Install only necessary npm dependencies. Or install everything with `npm i` for development.
- `npm run start` – Start dev server. File `.env.production` will not be used so consider creating [local environment file](#local-environment)
- `npm run build` – [More about environment and builds](#sites-build-environment)
- `npm run lint` – Check project with `eslint`

### Sites build environment

- `npm run build` – Generate production version of frontend using environment file [`.env.production`](./.env.production)

File [`.env.production`](./.env.production) contain environment variables for building scripts and for client usage. Some of those env variables:

| name                           | description/type                                                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `REACT_APP_VERSION`            | Same as in [`package.json`](./package.json). Used for client cache control                                              |
| `REACT_APP_CACHE_STORAGE_NAME` | Name of cache storage for browsers                                                                                      |
| `BUILD_PATH`                   | Build directory for webpack output                                                                                      |
| `GENERATE_SOURCEMAP`           | Explicitly set to `false` (but modification in [`webpack.config.js`](./config/webpack.config.js#L32) allows to skip it) |
| `PUBLIC_URL`                   | Root of project                                                                                                         |
| `REACT_APP_PRIMARY_COLOR`      | Hex color, used in [manifest](./config/manifest.template.json) and [`index.html`](./public/index.html) templates        |

You may pass more variables, see standard `react-scripts` and `webpack` docs.

### Local environment

You may create own local env (e.g. [.env.development.local](./.env.development.local)). It needs everything from [build env](#sites-build-environment) and contains optional values:

- set `HTTPS=true` to use https on local development server. If applied, set `SSL_CRT_FILE` and `SSL_KEY_FILE` as paths to certificate and key files.
- `PORT` – port of dev server.
- `DISABLE_ESLINT_PLUGIN=true` – disables esling plugin for webpack (warning overlay).

### Manifest and PWA

Manifest is built with `npm run build` from [template](./config/manifest.template.json) in [`scripts/build`](./scripts/build.js#L213). PWA is controlled by [`cache.js`](./src/util/cache.js) and [Service Worker](./src/service-worker.js) (_Cache first for static, network first for API_), which is built with [Webpack Service Worker Plugin](https://www.npmjs.com/package/@serguun42/webpack-service-worker-plugin).

---

### [BSL-1.0 License](./LICENSE)
