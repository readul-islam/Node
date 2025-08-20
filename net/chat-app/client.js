const net = require("net");
const readline = require("readline/promises");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (x, y) => {
  return new Promise((resolve) => {
    process.stdout.moveCursor(x, y, () => {
      resolve();
    });
  });
};
let id;
const socket = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    console.log(
      "Connected to server at",
      socket.remoteAddress,
      socket.remotePort
    );

    const ask = async () => {
      const message = await rl.question("Enter a message > ");
      await moveCursor(0, -1);
      await clearLine(0);

      socket.write(`${id}-message-${message}`);
    };

    // ask();

    socket.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      if (data.toString().includes("@User_id:")) {
        id = data.toString().split(":")[1].trim();
        console.log(`You are connected as User ID: ${id}\n`);
      } else {
        console.log(data.toString('utf-8'));
      }
      ask();
    });
  }
);

socket.on("end", () => {
  console.log("Disconnected from server");
});
