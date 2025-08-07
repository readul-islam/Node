class Logger {
  constructor() {
    this.logs = [];
  }

  get count() {
    return this.logs.length;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ message, timestamp });
    console.log(`${timestamp} - ${message}`);
  }
}
// create singleton class and insert our logger as instance and make a method getInstance which will return one instance
// class Singleton {
//   constructor() {
//     if (!Singleton.instance) {
//       Singleton.instance = new Logger();
//     }
//   }

//   getInstance() {
//     return Singleton.instance;
//   }
// }


// The new Logger() behind the seen working same as our singleton class . we are exporting a instance not a blueprint this is called singleton pattern
module.exports = new  Logger();
