const { Writable } = require("stream");
const fs = require("fs");
const { buffer } = require("stream/consumers");
class CustomWritable extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null; // file descriptor
    this.chunks = [];
    this.chunksSize = 0;
    this.writeCount = 0;
  }
  // This will run after the constructor, and it will put off all calling the other methods until we call the callback fn;

  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
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
  _write(chunk, encoding, callback) {
    // do our write operation
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;
    console.log('Flow - 1');
    if (this.chunksSize > this.writableHighWaterMark) {
      // if the size of the chunks is greater than the highWaterMark, we should write into the file
      //   this.pause();
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
      });

      // clear the chunks after writing
      this.chunks = [];
      this.chunksSize = 0;
      this.writeCount++;
      callback();
    } else {
      // when we're done , we should call the callback fn;
      callback();
    }
  }
  //   will execute after stream.end();
  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) {
        return callback(err);
      }
      console.log(`Flow - 2`);
      this.writeCount++;
      this.chunks = [];
      callback();
    });
  }
  //  This will call after the final method is called or when the stream is destroyed
  _destroy(error, callback) {
    console.log(`Flow - 3`);
    console.log(`Number of writes: ${this.writeCount}`);
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

const stream = new CustomWritable({
  highWaterMark: 1800,
  fileName: "customWritable.txt",
});
stream.write(Buffer.from("this assis a test data"));
stream.end();

stream.on("drain", () => {
  console.log("stream drained, you can write more data now");
});
