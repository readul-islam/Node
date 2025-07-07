/* Callback Version */
// const fs = require("fs");
// fs.watch("command.txt", (eventType, fileName)=>{
//     if(eventType === "change"){
//         console.log("File changed:", fileName);
//     }
// })

const fs = require("fs/promises");
/* Promise Version */
// open (31) file descriptor or a unique id to open this file called descriptor
// read or write
(async () => {
  try {
    const commandFileHandler = await fs.open("command.txt", "r");

    const watcher = fs.watch("command.txt");
    //   async iterator

    for await (const event of watcher) {
      if (event.eventType === "change") {
        // get file size in bytes
        const stat = await commandFileHandler.stat();
        console.log(stat);
        
        // we want to read the content
        const content = await commandFileHandler.read(Buffer.alloc(stat.size));
        console.log(content);
      }
    }
  } catch (error) {
    console.log("Error:", error);
  }
})();
