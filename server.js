const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;
const path = require("path");

app.get("/", (req, res) => {
  // コメントの場合
  // res.send("Hello world");
  res.sendFile(path.join(__dirname, "./index.html"));
  // 上記は同じ基本形でも可
  // res.sendFile(__dirname + "./index.html")

  // socket.ioのライブラリを使用してコネクション (引数はなんでもOK)
  io.on("connection", (socket) => {
    console.log("connected user");

    // クライアントサイドから受け取る.on
    socket.on("chat message", (msg) => {
      // console.log(`message: ${msg}`);

      // 個別クライアントから受け取ったデータを全てのクライアントサイドに対して送り返す(共有)
      io.emit("chat message", msg)
    });
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
