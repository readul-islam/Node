const net = require("net");
const readline = require("readline");
// net.createServer() // create a new TCP server
// net.createConnection() // create a new TCP connection as client;

const server = net.createServer();

// an array of client sockets
const clients = [];
server.on("connection", (socket) => {
  console.log(
    "New client connected: ",
    socket.remoteAddress,
    socket.remotePort
  );

  const clientId = clients.length + 1;

  clients.map((client) => {
    // send the new client its ID
    client.socket.write(`User ${client.id} is joined!`);
  });

  // send the client its ID
  socket.write(`@User_id: ${clientId}\n`);

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message") + 9);
    clients.map((client) => {
      client.socket.write(`User ${id}: ${message}`);
    });

    socket.on("end", () => {
      clients.map((client) => {
        client.socket.write(`User ${client.id}  left!`);
      });
    });
  });

  clients.push({ id: clientId, socket: socket });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is listening: ", server.address());
});
