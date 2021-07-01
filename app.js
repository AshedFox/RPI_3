const express = require("express"),
    path = require("path");

const app = express();

const hostname = '192.168.100.7'
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.header("Content-type: text/html");
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
