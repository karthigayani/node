// const express = require("express"); // "type": "commonjs" // 3rd party package import
import express from "express"; // "type" : "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL);
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";
import bcrypt from "bcrypt";

const app = express(); // calling express (now app contain rest api methods post,get,put,delete)

// const PORT = 4000; // You can also change port no. like 555, 111... except 3000 because react app is run on port 3000.
const PORT = process.env.PORT; // Auto assign PORT // In railway we cann't declare particular port no. 
// Connection
// const MONGO_URL = "mongodb://127.0.0.1:27017" // 27017 default local host 
// const MONGO_URL = "mongodb://127.0.0.1" // No need to mention When the localhost is default // here we mentioned localhost as in IP address.
const MONGO_URL = process.env.MONGO_URL; // Making URL online.
const client = new MongoClient(MONGO_URL); // client -> bridge b/w node and mongoDB // For eg: typing the phone no.
// top-level await
await client.connect(); // For eg: calling the no. // This will return promise so we put await before.
console.log("Mongo is connected !!!"); // verification purpose.

// Step:9 (Sending data from postman to node)
// XML JSON Text
// middleware - express.json() (inbuilt middleware) | JSON -> JS object
// app.use -> Intercepts -> applies express.json() (Inbuilt middleware)
// app.use -> applies express.json() while using post method in your app.

app.use(express.json()); // Step:8

app.get("/", function (request, response) { // "/" -> path
  response.send("Hello🙋‍♂️ World🌏🎉🎊✨");
});


app.use("/movies",moviesRouter);
app.use("/user",userRouter); // Step:2- Salttech user
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`)); 

// Step:1- Salttech user
// Applying Salt technique
// function generateHashedPassword(password) {
//   const No_OF_ROUNDS = 10;
//   const salt = bcrypt.genSalt(No_OF_ROUNDS);
//   const hashedPassword = bcrypt.hash(password, salt);
//   console.log(salt);
// }

async function generateHashedPassword(password) { // await works on async function and top level module only. So we convert function to async function.
  const No_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(No_OF_ROUNDS); // Salt generation take some time. So we used await.
  const hashedPassword = await bcrypt.hash(password, salt); // hashedPassword depends on salt value. So we used await.
  console.log(salt);
  console.log(hashedPassword);
}
generateHashedPassword("password@123"); // function Call.

export {client};

