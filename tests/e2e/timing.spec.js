describe('jet.timing', () => {
  it('setTimeout', cb => {
    const start = Date.now();
    jet.context.setTimeout(() => {
      const timeTaken = Date.now() - start;
      if (timeTaken >= 50) cb();
      else cb(new Error('setTimeout fn called too soon.'));
    }, 50);
  });

  it('setInterval', cb => {
    let times = 0;
    let interval;
    const start = Date.now();

    interval = jet.context.setInterval(() => {
      const timeTaken = Date.now() - start;

      times++;
      jet.context.clearInterval(interval);
      if (times >= 2) {
        return cb(new Error('Interval did not cancel correctly.'));
      }

      if (timeTaken < 50) {
        return cb(new Error('setInterval fn called too soon.'));
      }

      return jet.context.setTimeout(cb, 100);
    }, 50);
  });

  it('setImmediate', cb => {
    jet.context.setImmediate(() => cb());
  });

  it('requestIdleCallback', cb => {
    jet.context.requestIdleCallback(() => cb());
  });

  it('requestAnimationFrame', cb => {
    jet.context.requestAnimationFrame(() => cb());
  });
});
