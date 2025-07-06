/* Promise Api */

// const fs = require("fs/promises");
const { performance } = require("perf_hooks");

// (async () => {
//   try {
//     // Start measuring time
//     const start = performance.now();
//     await fs.copyFile("command.txt", "copy.txt");
//     // End measuring time
//     const end = performance.now();
//     console.log(`File copied successfully in ${end - start} milliseconds`);
//     // File copied successfully in 0.7130650000000003 milliseconds
//   } catch (error) {
//     console.log(error);
//   }
// })();

/* Callback Api */
// const fs_ = require("fs");
// const start = performance.now();

// fs_.copyFile("command.txt", "copied.txt", (err) => {
//   const end = performance.now();

//   if (err) {
//     console.error("❌ Error copying file:", err);
//   } else {
//     const duration = end - start;
//     console.log(`✅ File copied successfully in ${duration} milliseconds`);
//     // ✅ File copied successfully in 0.3700860000000006 milliseconds
//   }
// });

/* Synchronous Api */

const fs__ = require("fs");
const startSync = performance.now();
fs__.copyFileSync("command.txt", "sync1.txt");              
const endSync = performance.now();
const durationSync = endSync - startSync;
console.log(`File copied successfully in ${durationSync} milliseconds`);
// File copied successfully in 0.1261669999999988 milliseconds