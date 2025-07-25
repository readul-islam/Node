const fs = require("node:fs/promises");

(async () => {
  console.time('readBig')
  const readFileHandler = await fs.open("src.txt", "r");
  const writeFileHandler = await fs.open("write.txt", "w");
  const readStream = readFileHandler.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const writeStream = writeFileHandler.createWriteStream();

  readStream.on("data", (chunk) => {
    if (!writeStream.write(chunk)) {
      readStream.pause();
    }
  });

  writeStream.on("drain", () => {
    readStream.resume();
  });

  readStream.on("end", () => {
    readFileHandler.close();
    writeFileHandler.close();
    console.timeEnd('readBig')
  });

})();
