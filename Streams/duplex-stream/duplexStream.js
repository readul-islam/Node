const { Duplex } = require("node:stream");
const fs = require("node:fs");

class CustomDuplex extends Duplex {
  constructor({
    writableHighWaterMark,
    readableHighWaterMark,
    readFileName,
    writeFileName,
  }) {
    super({ writableHighWaterMark, readableHighWaterMark });
    this.readFileName = readFileName;
    this.writeFileName = writeFileName;
    this.readFd = null;
    this.writeFd = null;
    this.chunks = [];
    this.bytesFilled = 0;
  }

  _construct(callback) {
    fs.open(this.readFileName, "r", (err, readFd) => {
      if (err) return callback(err);
      this.readFd = readFd;

      fs.open(this.writeFileName, "w", (err, writeFd) => {
        if (err) return callback(err);
        this.writeFd = writeFd;
        callback();
      });
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.bytesFilled += chunk.length;

    if (this.bytesFilled > this.writableHighWaterMark) {
      fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
        if (err) return callback(err);
        this.chunks = [];
        this.bytesFilled = 0;
        callback();
      });
    } else {
      callback();
    }
  }

  _final(callback) {
    fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      this.chunks = [];
      callback();
    });
  }

  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.readFd, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err);
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
    });
  }

  _destroy(error, callback) {
    const tasks = [];

    if (this.readFd) tasks.push(fs.close(this.readFd));
    if (this.writeFd) tasks.push(fs.close(this.writeFd));

    Promise.all(tasks)
      .then(() => callback(error))
      .catch((err) => callback(err || error));
  }
}

// ---- Usage ----
const duplex = new CustomDuplex({
  readFileName: "read.txt",
  writeFileName: "write.txt",
  writableHighWaterMark: 1024,
  readableHighWaterMark: 1024,
});

duplex.write(Buffer.from("this is writing now\n"));
duplex.end(Buffer.from("end\n"));

duplex.on("finish", () => {
  console.log("Write finished");

  // Optional: Read from duplex after write ends
  duplex.on("data", (chunk) => {
    console.log("Read:", chunk.toString());
  });

  duplex.on("end", () => {
    console.log("Read ended");
  });
});
