<p align="center">
  <a href="https://invertase.io">
    <img height="180" src="https://static.invertase.io/assets/jet.png"><br/>
  </a>
  <h2 align="center">Jet</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/jet"><img src="https://img.shields.io/npm/dm/jet.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://www.npmjs.com/package/jet"><img src="https://img.shields.io/npm/v/jet.svg?style=flat-square" alt="NPM version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/jet.svg?style=flat-square" alt="License"></a>
  <a href="https://discord.gg/C9aK28N"><img src="https://img.shields.io/discord/295953187817521152.svg?logo=discord&style=flat-square&colorA=7289da&label=discord" alt="Chat"></a>
  <a href="https://twitter.com/invertaseio"><img src="https://img.shields.io/twitter/follow/invertaseio.svg?style=social&label=Follow" alt="Follow on Twitter"></a>
</p>

---

Jet lets you test your React Native Module APIs in JS mock free and native testing code free - ideal for testing React Native modules e2e.

**Features:**

- ⏩ Test with JavaScript - write your native module tests in javascript and fully e2e test them.
- 💯 Coverage - get full code coverage output for your React Native module's JS API with built in coverage support (`--coverage`).


![image](https://github.com/invertase/jet/assets/5347038/d0ca2c5b-7eee-48bb-94b5-21881455142d)

---

> Latest supported React Native version: **^0.74**

---

## Quick Setup

```sh
yarn add jet
```

These docs are still TODO, for now see [example](./example), in particular:

Configuring Jet and targets:

- [.jetrc.js](./example/.jetrc.js)

Adding the test UI and your tests:

- [App.tsx](./example/App.tsx)

Configuring coverage instrumentation:

- [babel.config.js](./example/babel.config.js)
- [nyc.config.js](./example/nyc.config.js)

### Running tests

```sh
jet --target=macos
```

### `.jetrc.js`

Example:

```js
const proc = require('node:child_process');

module.exports = {
  config: {
    // Global config overrides/defaults...
  },
  targets: {
    // Use any key name to specify a new 'target' (--target=<key>)
    // [key: string]: { ... }
    macos: {
      // --target=macos
      config: {
        // Per target config overrides...
        // These will override in order of:
        // ...cliFlags
        // ...globalConfig
        // ...targetConfig
      },
      /**
       * Use this to run builds, start the application etc.
       */
      async before(config) {
        proc.spawnSync('npx', ['react-native', 'run-macos']);
        return config;
      },
      /**
       * Use this for cleanup & teardown.
       */
      async after(config) {
        console.log('After');
      },
    },
  },
};
```

## 💛 How can I help?

For now please see the open issues tracking work that needs doing discussions and thoughts on these issues and on Jet will help us mature the project into a useful tool.

---

## 😎 Projects using Jet

These projects use Jet to test their modules:

- [React Native Firebase](https://github.com/invertase/react-native-firebase): 🔥 A well tested feature rich modular Firebase implementation for React Native. Supports both iOS & Android platforms for over 15 Firebase services.

Submit a PR to add your project here.
