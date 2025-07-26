const { Readable } = require("stream");

class CustomReadable extends Readable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null; // file descriptor

    this.readCount = 0;
  }
  // This will run after the constructor, and it will put off all calling the other methods until we call the callback fn;

  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      // Flow - 0
      console.log("Flow - 0");
      if (err) {
        // so if we call the callback with an argument , it means that we have an error and we cannot proceed
        return callback(err);
      }
      this.fd = fd;

      //   no argument means it was successful
      callback();
    });
  }
  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if (err) this.destroy(err);
      this.readCount++;
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
    });
  }

  _destroy(error, callback) {
    console.log(`Flow - 3`);
    console.log(`Read count: ${this.readCount}`);

    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      });
    } else {
      callback(error);
    }
    this.fd = null; // reset file descriptor
  }
}

const stream = new CustomReadable({
  highWaterMark: 1800,
  fileName: "customWritable.txt",
});
