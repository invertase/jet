<p align="center">
  <a href="https://invertase.io">
    <img height="256" src="https://static.invertase.io/assets/jet.png"><br/>
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

> **WARNING:** Jet (formerly [Bridge](https://github.com/Salakar/bridge)) is currently a Proof of Concept, APIs and usage is likely to change by the first release version.

> This repo is in development and does not have a release version yet. A parked working version of the Proof of Concept can be found [here](https://github.com/Salakar/bridge).

----

Jet lets you bring your React Native JS code into NodeJS and test it mock free and native testing code free. Perfect for React Native module developers who want to fully test their packages end-to-end and setup continuous integration services.

Jet extends upon [`wix/detox`](https://github.com/wix/detox) and by default the [Mocha testing framework](https://mochajs.org/).

Detox provides all the functionality you'll need to control your testing app, device and it's UI (if you have one) whilst Jet allows JS code execution in the context of your RN app via Node.js - giving you full access to all the Native api's exactly like you'd have inside your app.

----

> Latest supported React Native version: **^0.56.0**

> Latest supported Detox version: **^8.1.0**

----

## Features

### ⏩ Test with JavaScript 

Your test suites and your React Native code run inside NodeJS - making testing your modules with NodeJS testing frameworks (mocha only currently) easy.

![test suite](https://static.invertase.io/assets/jet/tests-1.gif)


### 🐞 Debugging

Supports debugging your test suites and your React Native JS bundle using the standard NodeJS debugger protocol.

![debugging](https://static.invertase.io/assets/jet/debugging.gif)


### 💯 Coverage

Get full code coverage output for your React Native module's JS API using [istanbul/nyc](https://github.com/istanbuljs/nyc) coverage tools.

![coverage](https://static.invertase.io/assets/jet/coverage.png)


### ☕️ Full Detox API support

Supports the full [Detox API](https://github.com/wix/detox/blob/master/docs/README.md#api-reference); reloading or relaunching your app automatically reconnects to your React Native JS bundle.

![detox](https://static.invertase.io/assets/jet/detox.png)


### ✨ Full access to React Native bundle context

Jet gives you full access to the JS context of your React Native app inside NodeJS ⚡️. 

Some examples of what you can do with this power:

  - Expose your root view/component to Jet on mount; allowing you to then programatically modify it inside tests, e.g. calling `setState()` on it inside a test - why not?
  - Expose your stores, allowing them to be controlled in tests - e.g. Redux.
  - Require any of your React Native apps bundled modules/files inside NodeJS, for example;
    - `const { Platform } = jet.require('react-native');` - e.g. - platform specific test logic.
    - `const CollectionReference = jet.require('dist/modules/firestore/CollectionReference');` - e.g. for `instanceof` tests.

### ⏱ Timing API -> NodeJS

> **Experimental**

React Native `JSTiming/Timing/RCTTiming` modules in Jet run inside NodeJS, this means that all timers are handled directly in NodeJS with no calls to Native device APIs using Jets [custom Timing class](https://github.com/invertase/jet/blob/master/lib/node/timing.js)

This greatly increases the speed of tests and reduces round trips to native. Additionally this bypasses issues such as Android device time drifting (due to a incorrect date/time on device). This can also potentially be used to monitor FPS or control the FPS rate programmatically.

----

----

## 📖 Documentation

Sorry the docs are still to be written up - but an idea APIs/what you can do with it can been seen in the early [Jet testing suite here for React Native Firebase.](https://github.com/invertase/react-native-firebase/blob/master/bridge/e2e/bridge.spec.js) There's also the [React Native Firebase testing project](https://github.com/invertase/react-native-firebase/tree/master/bridge) for reference.


## 💛 How can I help?

For now please see the open issues tracking work that needs doing discussions and thoughts on these issues and on Jet will help us mature the project into a useful tool.

----

## 😎 Projects using Jet

These projects use Jet to test their modules:

- [React Native Firebase](https://github.com/invertase/react-native-firebase): 🔥 A well tested feature rich modular Firebase implementation for React Native. Supports both iOS & Android platforms for over 15 Firebase services.

Submit a PR to add your project here.
