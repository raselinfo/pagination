const Joi = require("joi");
const Mongoose = require("mongoose");
const pagination = require("./pagination");
const User = require("./user.js");
const express = require("express");
const Ajv = require("ajv");
const user = require("./user.js");
const ajv = new Ajv({ allErrors: true });
const app = express();
app.use(express.json());

const db = `mongodb://localhost:27017/student`;
const connectDB = async () => {
  try {
    const connect = await Mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected at", connect.connection.host);
    app.listen(4000, () => {
      console.log("http://localhost:4000");
    });
  } catch (err) {
    console.log("Error", err);
  }
};
connectDB();

app.get("/users", async (req, res) => {
  const { page, limit, skip } = pagination(req);

  try {
    const users = await User.find().skip(skip).limit(limit);
    const remainingUsers = await User.find({
      _id: { $gt: users.at(-1)._id },
    });

    console.log(remainingUsers.length);

    return res.send({
      page: page,
      limit: limit,
      totalUsers: users.length,
      nextPage: remainingUsers.length === 0 ? null : page + 1,
      nextTotalUsers: remainingUsers.length,
      data: users,
    });
  } catch (err) {
    res.send(err);
  }
});

// app.post("/users", async (req, res) => {
//   const users = req.body;
//   try{
//    const allUsers= await User.insertMany(users)
//     return res.send(allUsers);
//   }catch(err){
//     return res.send(err)
//   }
// });

app.get("/health", (_req, res) => {
  res.send("hello");
});
