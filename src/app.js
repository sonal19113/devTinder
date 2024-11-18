const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);
app.use("/profile",profileRouter);
app.use("/request",requestRouter);
app.use("/user",userRouter);



connectDB()
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log(`Listening at port number ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Something went wrong ${err}`);
  });

app.use("/static", express.static(path.join(__dirname, "public")));

 











