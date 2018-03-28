# Bridge

Bridge lets you bring your React Native JS code into Nodejs and test it mock free and native testing code free. Perfect for React Native module developers who want to fully test their packages end-to-end and setup continuous integration services (including coverage 💯). 

Bridge extends upon [`wix/detox`](https://github.com/wix/detox) and by default the [Mocha testing framework](https://mochajs.org/) (we'd also like to add Jest support). 

Detox provides all the functionality you'll need to control your testing app, device and it's UI (if you have one) whilst Bridge allows JS code execution in the context of your RN app - giving you full access to all the Native api's exactly like you'd have inside your app.


----

**Discord** (`bridge` channel): https://discord.gg/C9aK28N

----

### Docs are TODO

Sorry the docs are still to be written up - but an idea of what you can do with it can been seen in the early [bridge testing suite here.](https://github.com/invertase/react-native-firebase/blob/bridge-detox/tests-new/e2e/bridge.spec.js) We also have [this example testing project.](https://github.com/invertase/react-native-firebase/tree/master/bridge)

The alpha is available on the `next` tag:

```bash
npm i bridge@next
```

## Previews

The below previews are from [this example testing project](https://github.com/invertase/react-native-firebase/tree/master/bridge) and are running a small batch of Mocha tests for [react-native-firebase](https://github.com/invertase/react-native-firebase) inside Nodejs:

### iOS

![ios](https://cdn.discordapp.com/attachments/362967412175405059/428355596073435137/2018-03-28_01.46.19.gif)

----

### Android

![android](https://cdn.discordapp.com/attachments/362967412175405059/428357262055178240/2018-03-28_01.55.43.gif)
