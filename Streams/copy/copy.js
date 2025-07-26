const fs = require("node:fs/promises");

// (async()=>{
//     console.time('copy');
//     const writeFileHandler = await fs.open('copy.txt', 'w');
//     const readFileBuffer = await fs.readFile('../readable-stream/src.txt');
//     // writeFileHandler.write(readFileBuffer); // unsafe for write multiple time
//     writeFileHandler.writeFile(readFileBuffer)
//     console.timeEnd('copy')

// })()

// own stream
(async () => {
  console.time("copy");
  const writeFileHandler = await fs.open("copy.txt", "w");
  const readFileHandler = await fs.open("../readable-stream/src.txt", "r");
  // writeFileHandler.write(readFileBuffer); // unsafe for write multiple time
  let bytesRead = -1;

  while (bytesRead !== 0) {
    const readResult = await readFileHandler.read();
    bytesRead = readResult.bytesRead;
    if (bytesRead !== 16384) {
      const indexOfNotFilled = readResult.buffer.indexOf(0);
      const newBuffer = new Buffer.alloc(indexOfNotFilled);

      readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
      writeFileHandler.write(newBuffer);
    } else {
      writeFileHandler.write(readResult.buffer);
    }
  }
  console.timeEnd("copy");
})();
