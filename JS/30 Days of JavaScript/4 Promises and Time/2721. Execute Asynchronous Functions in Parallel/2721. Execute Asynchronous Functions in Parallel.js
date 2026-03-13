/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        const total = functions.length;

        functions.forEach((fn, index) => {
            try {
                fn()
                    .then(value => {
                        results[index] = value;
                        completed++;
                        if (completed === total) {
                            resolve(results);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            } catch (err) {
                reject(err);
            }
        });
    });
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */