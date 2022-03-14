function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
        if (next.done) {
          return resolve(next.value);
        }
        Promise.resolve(next.value).then(
          function (v) {
            step(function () {
              return gen.next(v);
            });
          },
          function (e) {
            step(function () {
              return gen.throw(e);
            });
          }
        );
      } catch (e) {
        return reject(e);
      }
    }
    step(function () {
      return gen.next(undefined);
    });
  });
}
