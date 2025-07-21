/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.apply(
        this,
        args.concat((error, data) => {
          if (error) {
            return reject(error);
          }

          resolve(data);
        })
      );
    });
  };
}
