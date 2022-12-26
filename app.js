require("dotenv").config();

const express = require("express")
var cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");

const app = express()
// const port = 3003

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
  
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
  // app.use(cors(corsOptions));

/** Import modul aplikasi sistem sesuai folder */
const authRoute = require("./routes/authentication/index");
const accessAdmin = require("./routes/access/index");

//
// app.use("/", (req, res, indexRouter) => {
//     res.send('Hello World!')
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// nama route yang diinginkan
app.use("/", indexRouter);
app.use("/authentication", authRoute);

app.use("/access", accessAdmin);

app.listen(3003);
module.exports = app;