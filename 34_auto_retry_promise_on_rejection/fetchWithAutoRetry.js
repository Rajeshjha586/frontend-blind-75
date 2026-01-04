/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */

function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return fetcher().catch((error) => {
    if (maximumRetryCount > 0) {
      console.log(`Retrying... remaining retries: ${maximumRetryCount}`);
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
    }
    throw error;
  });
}

//For Testing purpose
let attempts = 0;

function unstableFetcher() {
  return new Promise((resolve, reject) => {
    attempts++;
    console.log(`Attempt #${attempts}`);

    if (attempts < 3) {
      reject(new Error("Network error"));
    } else {
      resolve("✅ Success on attempt " + attempts);
    }
  });
}

fetchWithAutoRetry(unstableFetcher, 3)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("❌ Failed:", error.message);
  });

// function alwaysFailFetcher() {
//   return Promise.reject(new Error("Always fails"));
// }

// fetchWithAutoRetry(alwaysFailFetcher, 2).catch((e) =>
//   console.log("Final error:", e.message)
// );

// function fetchWithAutoRetry(fetcher, maximumRetryCount) {
//   return new Promise((resolve, reject) => {
//     let retryCount = 0;

//     const callFetcher = () =>
//       fetcher().then(
//         (data) => {
//           resolve(data);
//         },
//         (error) => {
//           if (retryCount < maximumRetryCount) {
//             callFetcher();
//             retryCount += 1;
//           } else {
//             reject(error);
//           }
//         }
//       );

//     callFetcher();
//   });
// }
