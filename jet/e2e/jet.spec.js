
describe('jet', () => {
  it('should provide -> global.jet', async () => {
    should(jet).not.be.undefined();
    return Promise.resolve();
  });

  // react-native module access
  it('should provide -> jet.rn', () => {
    should(jet.rn).not.be.undefined();
    should(jet.rn.Platform.OS).be.a.String();
    should(jet.rn.Platform.OS).equal(device.getPlatform());
    return Promise.resolve();
  });

  // 'global' context of the app's JS environment
  it('should provide -> jet.context', () => {
    should(jet.context).not.be.undefined();
    should(jet.context.setTimeout).be.a.Function();
    should(jet.context.window).be.a.Object();
    // etc ... e.g. __coverage__ is here also if covering
    return Promise.resolve();
  });

  // the apps root component
  // allows you to read and set state if required
  xit('should provide -> jet.root', async () => {
    should(jet.root).not.be.undefined();
    should(jet.root.setState).be.a.Function();
    should(jet.root.state).be.a.Object();

    // test setting state
    await new Promise(resolve =>
      jet.root.setState({ message: 'hello world' }, resolve),
    );
    should(jet.root.state.message).equal('hello world');
    return Promise.resolve();
  });

  // we shim our own reloadReactNative functionality as the detox reloadReactNative built-in
  // hangs often and seems unpredictable - todo: investigate & PR if solution found
  // reloadReactNative is replaced on init with jet.root automatically
  xit('should allow reloadReactNative usage without breaking remote debug', async () => {
    should(jet.reload).be.a.Function();
    // and check it works without breaking anything
    await device.reloadReactNative();
    should(jet.reload).be.a.Function();
    return Promise.resolve();
  });

  it('should allow launchApp usage without breaking remote debug', async () => {
    should(jet.module).not.be.undefined();
    should(jet.reload).be.a.Function();
    should(jet.rn).not.be.undefined();
    should(jet.rn.Platform.OS).be.a.String();
    should(jet.rn.Platform.OS).equal(device.getPlatform());

    await device.launchApp({ newInstance: true });

    should(jet.module).not.be.undefined();
    should(jet.reload).be.a.Function();
    should(jet.rn).not.be.undefined();
    should(jet.rn.Platform.OS).be.a.String();
    should(jet.rn.Platform.OS).equal(device.getPlatform());
    return Promise.resolve();
  });
});
