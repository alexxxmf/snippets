// const promisifiedFn = promisify(randomFn)
// promisifiedFn(("randomFnParam1", "randomFnParam1"))

const promisify = (fn) => {
  return (...args) => {
    new Promise((resolve, reject) => {
      const handleErrorAndValue = (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      };
      fn.call(this, ...args, handleErrorAndValue);
    });
  };
};
