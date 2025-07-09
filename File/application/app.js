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

// const fileChangeHandler =
const commands = {
  CREATE_A_FILE: "create a file",
};
// create a file handler
const createFileHandler = async (path) => {
  try {
    const isExistFile = await fs.open(path, "r");
    isExistFile.close();
    return console.log(`File already exist in ${path}`)
  } catch (error) {
    const newFile = await fs.open(path, "w");
    console.log("A new file was successfully created.")
    newFile.close();
  }
};

(async () => {
  try {
    const commandFileHandler = await fs.open("command.txt", "r");

    commandFileHandler.on("change", async () => {
      // get file size in bytes
      const size = (await commandFileHandler.stat()).size;
      const buffer = Buffer.alloc(size);

      const length = buffer.byteLength;
      const position = 0;
      const offset = 0;

      // console.log(stat);

      // we want to read the content
      await commandFileHandler.read(buffer, offset, length, position);
      // create a file
      const content = buffer.toString("utf-8");
      if (content.includes(commands.CREATE_A_FILE)) {
        // extract path;
        const path = content.substring(commands.CREATE_A_FILE.length + 1);
        createFileHandler(path);
      }
    });

    const watcher = fs.watch("command.txt");
    //   async iterator

    for await (const event of watcher) {
      if (event.eventType === "change") {
        commandFileHandler.emit("change");
      }
    }
  } catch (error) {
    console.log("Error:", error);
  }
})();
