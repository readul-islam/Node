// const fs = require('node:fs/promises');

/* 
Execution: 11.5s
Cpu: 100%
Memory Usage: 35 MB
*/
// (async()=>{
//     console.time('writeMany')

//     const fileHandler = await fs.open('text.txt', 'w');
//     for(let i = 0; i<10000000; i++){
//         await fileHandler.write(` ${i} `);
//     }
//     fileHandler.close();
//     console.timeEnd('writeMany')
// })()

// const fs = require("fs");
/* 
Execution: 1.5s
Cpu: 100%
Memory Usage: 30 MB
*/
// fs.open("text.txt", "w", (err, fd) => {
//     console.time('writeMany')
//   if (!err) {
//     for (let i = 0; i < 10000000; i++) {
//         const buff = new Buffer.from( ` ${i} `, 'utf-8')
//         fs.writeSync(fd, buff)
//     }
//   }
//   console.timeEnd('writeMany')
// });

/* 
Execution: 3.028ss
Cpu: 100%
Memory Usage: 35 MB
*/
// const fs = require('node:fs/promises');

// (async()=>{
//     console.time('writeMany')

//     const fileHandler = await fs.open('text.txt', 'w');
//     const stream = fileHandler.createWriteStream();
//     for(let i = 0; i<10000000; i++){
//         await stream.write(` ${i} `);
//     }
//     fileHandler.close();
//     console.timeEnd('writeMany')
// })()

const fs = require("node:fs/promises");

(async () => {
  console.time("writeMany");
  let i = 0;
  const fileHandler = await fs.open("../readable-stream/src.txt", "w");
  const stream = fileHandler.createWriteStream();

  //   console.log(stream.writableHighWaterMark);
  //   console.log(stream.writableLength);

  function writeMany() {
    while (i < 10000000) {
      const buffer = new Buffer.from(` ${i} `, "utf-8");
      if (i === 9999999) {
        stream.end(buffer);
        return;
      }
      if (stream.write(buffer)) {
        i++;
      } else {
        break;
      }
    }
  }
  writeMany();
  stream.on("drain", () => {
    writeMany();
  });
  stream.on("finish", () => {
    fileHandler.close();
    console.timeEnd("writeMany");
  });
})();
