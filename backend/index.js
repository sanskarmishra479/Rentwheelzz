const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./Routers/users");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors({
    origin: "https://rentwheelzz.vercel.app",
    credentials: true
  }));

app.use("/user", userRouter);


async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(3000);
    console.log("we are live at http://localhost:3000/");
}
main()
