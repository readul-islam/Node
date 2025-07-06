/* Callback Version */
// const fs = require("fs");
// fs.watch("command.txt", (eventType, fileName)=>{
//     if(eventType === "change"){
//         console.log("File changed:", fileName);
//     }
// })

const fs = require("fs/promises");
/* Promise Version */
(async () => {
  try {
    const watcher = fs.watch("command.txt");
    //   async iterator

    for await (const event of watcher){
   if(event.eventType === "change"){
    console.log('File changed:', event.filename);
   }
    }
  } catch (error) {
    console.log("Error:", error);
  }
})();


