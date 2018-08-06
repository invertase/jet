<p align="center">
  <a href="https://invertase.io">
    <img height="220" src="https://static.invertase.io/assets/jet-animated.gif"><br/>
  </a>
  <h2 align="center">Jet</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@invertase/jet"><img src="https://img.shields.io/npm/dm/@invertase/jet.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://www.npmjs.com/package/@invertase/jet"><img src="https://img.shields.io/npm/v/@invertase/jet.svg?style=flat-square" alt="NPM version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/@invertase/jet.svg?style=flat-square" alt="License"></a>
  <a href="https://discord.gg/C9aK28N"><img src="https://img.shields.io/discord/295953187817521152.svg?logo=discord&style=flat-square&colorA=7289da&label=discord" alt="Chat"></a>
  <a href="https://twitter.com/invertaseio"><img src="https://img.shields.io/twitter/follow/invertaseio.svg?style=social&label=Follow" alt="Follow on Twitter"></a>
</p>

> **WARNING:** Jet (formerly [Bridge](https://github.com/Salakar/bridge)) is currently a Proof of Concept, APIs and usage is likely to change by the first release version.

Jet lets you bring your React Native JS code into NodeJS and test it mock free and native testing code free. Perfect for React Native module developers who want to fully test their packages end-to-end and setup continuous integration services (including coverage 💯).

Jet extends upon [`wix/detox`](https://github.com/wix/detox) and by default the [Mocha testing framework](https://mochajs.org/).

Detox provides all the functionality you'll need to control your testing app, device and it's UI (if you have one) whilst Jet allows JS code execution in the context of your RN app via Node.js - giving you full access to all the Native api's exactly like you'd have inside your app.

----

## Features

### Run your test suites in NodeJS 

Your test suites and your React Native code run inside NodeJS - making testing your modules with NodeJS testing frameworks such as Mocha easy.

![test suite](https://static.invertase.io/assets/jet/tests-1.gif)


### Debugging

Supports debugging your test suites and your React Native JS bundle using the standard NodeJS debugger protocol.

![debugging](https://static.invertase.io/assets/jet/debugging.gif)

### Coverage

Get full code coverage output for your React Native module's JS API using [istanbul/nyc](https://github.com/istanbuljs/nyc) coverage tools.

![coverage](https://static.invertase.io/assets/jet/coverage.png)

### Full Detox API support

Supports the full [Detox API](https://github.com/wix/detox/blob/master/docs/README.md#api-reference); reloading or relaunching your app automatically reconnects to your React Native JS bundle.

![detox](https://static.invertase.io/assets/jet/detox.png)

----

## Documentation

Sorry the docs are still to be written up - but an idea APIs/what you can do with it can been seen in the early [Jet testing suite here for React Native Firebase.](https://github.com/invertase/react-native-firebase/blob/master/bridge/e2e/bridge.spec.js) There's also the [React Native Firebase testing project](https://github.com/Salakar/react-native-firebase/tree/master/bridge) for reference.


## How can I help?

For now please see the open issues tracking work that needs doing. Full contributing docs will be written.


## Projects using Jet

These projects use Jet to test their modules:

- [React Native Firebase](https://github.com/invertase/react-native-firebase): A well tested feature rich Firebase implementation for React Native, supporting both iOS & Android platforms for 12+ Firebase modules (including a feature rich Notifications implementation) 🔥

Submit a PR to add your project here.
