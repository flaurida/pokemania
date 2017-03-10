const fs = require("fs");
const Sockets = require('./server/sockets');

const handler = (req, res) => {
  let path;
  const splitUrl = req.url.split(".");

  if (req.url === "/") {
    path = __dirname + "/index.html";
  } else if (splitUrl[splitUrl.length - 1] === "css" ||
      splitUrl[splitUrl.length - 1] === "js" ||
      splitUrl[splitUrl.length - 1] === "png") {
    path = __dirname + req.url;
  } else {
    res.writeHead(404);
    return res.end("That path is not found");
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading Pokemania :(");
    }

    res.writeHead(200);
    res.end(data);
  });
};

const app = require("http").createServer(handler);
const io = require("socket.io")(app);
const PORT = process.env.PORT || 3000;

app.listen(PORT);

new Sockets(io);
