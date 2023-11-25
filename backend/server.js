const express = require('express');
const app = express();
require("./database/connection");
const cors = require("cors");
const router = require("./API/router");
const post = require('./API/post');
const user = require('./API/user');
const chat = require('./API/chat');
const msg = require('./API/message');
const cookieParser = require("cookie-parser");
const port = 8000;

// app.get("/", (req, res) => {
//     res.status(201).json('server created');
// });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);
app.use(post);
app.use(user);
app.use(chat);
app.use(msg);

app.listen(port, () => {
    console.log(`server start at port ${port}`);
})