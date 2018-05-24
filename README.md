<p align="center">
  <a href="https://github.com/Salakar/bridge">
    <img src="https://i.imgur.com/Srik55r.png"><br/>
  </a>
  <h2 align="center">Bridge</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/bridge"><img src="https://img.shields.io/npm/dm/bridge.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://www.npmjs.com/package/bridge"><img src="https://img.shields.io/npm/v/bridge.svg?style=flat-square" alt="NPM version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/bridge.svg?style=flat-square" alt="License"></a>
  <a href="https://twitter.com/mikediarmid"><img src="https://img.shields.io/twitter/follow/mikediarmid.svg?style=social&label=Follow" alt="Follow on Twitter"></a>
</p>


Bridge lets you bring your React Native JS code into Nodejs and test it mock free and native testing code free. Perfect for React Native module developers who want to fully test their packages end-to-end and setup continuous integration services (including coverage 💯).

Bridge extends upon [`wix/detox`](https://github.com/wix/detox) and by default the [Mocha testing framework](https://mochajs.org/) (we'd also like to add Jest support).

Detox provides all the functionality you'll need to control your testing app, device and it's UI (if you have one) whilst Bridge allows JS code execution in the context of your RN app - giving you full access to all the Native api's exactly like you'd have inside your app.

----

## Documentation

Sorry the docs are still to be written up - but an idea of what you can do with it can been seen in the early [bridge testing suite I made here.](https://github.com/invertase/react-native-firebase/blob/master/bridge/e2e/bridge.spec.js) There's also [this example testing project.](https://github.com/Salakar/react-native-firebase/tree/master/bridge)

The alpha is available on the `next` tag:

```bash
npm i bridge@next
```

## How can I help?

For now please see the open issues tracking work that needs doing. Full contributing docs will be written.

## Previews

The below previews are from [this example testing project](https://github.com/invertase/react-native-firebase/tree/master/bridge) and are running a small batch of Mocha tests for [react-native-firebase](https://github.com/invertase/react-native-firebase) inside Nodejs:

### iOS

![ios](https://cdn.discordapp.com/attachments/362967412175405059/428355596073435137/2018-03-28_01.46.19.gif)

----

### Android

![android](https://cdn.discordapp.com/attachments/362967412175405059/428357262055178240/2018-03-28_01.55.43.gif)


## Projects using Bridge

These projects use Bridge to test their modules:

- [React Native Firebase](https://github.com/invertase/react-native-firebase): A well tested feature rich Firebase implementation for React Native, supporting both iOS & Android platforms for 12+ Firebase modules (including a feature rich Notifications implementation) 🔥

Submit a PR to add your project here.
