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
  socket.write(`@User_id: ${clientId}\n`);


  socket.on("data", (data) => {
    clients.map((client) => {
      client.socket.write(data);
    });
  });

  clients.push({id: clientId, socket:socket});
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is listening: ", server.address());
});
