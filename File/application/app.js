/* Callback Version */
// const fs = require("fs");
// fs.watch("command.txt", (eventType, fileName)=>{
//     if(eventType === "change"){
//         console.log("File changed:", fileName);
//     }
// })

const { rename } = require("fs");
const fs = require("fs/promises");
/* Promise Version */
// open (31) file descriptor or a unique id to open this file called descriptor
// read or write

// const fileChangeHandler =
const cmd = {
  CREATE_A_FILE: "create a file",
  DELETE_A_FILE: "delete a file",
  RENAME_A_FILE: "rename a file",
  COPY_A_FILE: "copy a file",
  MOVE_A_FILE: "move a file",
  READ_A_FILE: "read a file",
  WRITE_A_FILE: "write a file",
  APPEND_A_FILE: "append a file",
  LIST_FILES: "list files",
  LIST_DIRECTORIES: "list directories",
  LIST_ALL: "list all",
  CREATE_A_DIRECTORY: "create a directory",
  DELETE_A_DIRECTORY: "delete a directory",
  RENAME_A_DIRECTORY: "rename a directory",
  COPY_A_DIRECTORY: "copy a directory",
  MOVE_A_DIRECTORY: "move a directory",
  READ_A_DIRECTORY: "read a directory",
  WRITE_A_DIRECTORY: "write a directory",
  APPEND_A_DIRECTORY: "append a directory",
  LIST_DIRECTORY_CONTENT: "list directory content",
};
// create a file handler
const createFileHandler = async (path) => {
  try {
    const isExistFile = await fs.open(path, "r");
    isExistFile.close();
    return console.log(`File already exist in ${path}`);
  } catch (error) {
    const newFile = await fs.open(path, "w");
    console.log("A new file was successfully created.");
    newFile.close();
  }
};

// delete a file handler
const deleteFileHandler = async (path) => {
  try {
    const isExistFile = await fs.open(path, "r");
    if (isExistFile) {
      isExistFile.close();
      await fs.unlink(path);
      console.log(`File ${path} was successfully deleted.`);
    }
  } catch (error) {
    console.log(`File ${path} does not exist or could not be deleted.`);
  }
};

// rename a file handler
const renameFileHandler = async (oldPath, newPath) => {
  try {
    const isExistFile = await fs.open(oldPath, "r");
    if (isExistFile) {
      isExistFile.close();
      await fs.rename(oldPath, newPath);
      console.log(`File ${oldPath} was successfully renamed to ${newPath}.`);
    }
  } catch (error) {
    console.log(`File ${oldPath} does not exist or could not be renamed.`);
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
      // create a file:
      // cmd: create a file <path>
      const content = buffer.toString("utf-8");
      if (content.includes(cmd.CREATE_A_FILE)) {
        // extract path;
        const path = content.substring(cmd.CREATE_A_FILE.length + 1);
        createFileHandler(path);
      }
      // Delete a file:
      // cmd: delete a file <path>
      if (content.includes(cmd.DELETE_A_FILE)) {
        const path = content.substring(cmd.DELETE_A_FILE.length + 1);
        deleteFileHandler(path);
      }

      // Rename a file:
      // cmd: rename a file <oldPath> <newPath>
      if (content.includes(cmd.RENAME_A_FILE)) {
        const [oldPath, newPath] = content
          .substring(cmd.RENAME_A_FILE.length + 1)
          .split(" ");
        renameFileHandler(oldPath, newPath);
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
