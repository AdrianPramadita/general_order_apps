require("dotenv").config();

const express = require('express')
const indexRouter = require("./routes/index");

const app = express()
// const port = 3003

app.use("/", (req, res, indexRouter) => {
    res.send('Hello World!')
});

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

app.listen(3003);
module.exports = app;