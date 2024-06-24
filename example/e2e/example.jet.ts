for (let i = 0; i < 100; i++) {
  it(`test example ${i}`, () => {
    return new Promise(resolve => setTimeout(resolve, 50));
  });
}

describe('test suite example', () => {
  it('test in suite example', () => {
    return new Promise(resolve => setTimeout(resolve, 50));
  });
});

it.skip('test skipping example', () => {
  return new Promise(resolve => setTimeout(resolve, 50));
});
