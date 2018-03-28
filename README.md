# Bridge

Bridge lets you bring your React Native JS code into Nodejs and test it mock free and native code free. Perfect for React Native module developers who want to fully test their packages end-to-end and setup continuous integration services (incl. coverage!). 

Bridge was built around our requirements for [React Native Firebase](https://github.com/invertase/react-native-firebase) - an extensive React Native module with a ton of native code that we want to test heavily end-to-end.

Currently it extends upon [`wix/detox`](https://github.com/wix/detox) and Mocha (we'd also like to add Jest support). Detox provides all the functionality you'll need to control your testing app and device.


----

**Discord** (`bridge` channel): https://discord.gg/C9aK28N

----

### Docs are TODO

Sorry the docs are still to be written up - but an idea of what you can do with it can been seen in the early [bridge testing suite here.](https://github.com/invertase/react-native-firebase/blob/bridge-detox/tests-new/e2e/bridge.spec.js)

The alpha is available on the `next` tag:

```bash
npm i bridge@next
```

## Previews

The below previews are from [this example testing project](https://github.com/invertase/react-native-firebase/tree/bridge-detox/tests-new) and are running a small batch of Mocha tests inside Nodejs:

### iOS

![ios](https://cdn.discordapp.com/attachments/362967412175405059/428355596073435137/2018-03-28_01.46.19.gif)

----

### Android

![android](https://cdn.discordapp.com/attachments/362967412175405059/428357262055178240/2018-03-28_01.55.43.gif)
