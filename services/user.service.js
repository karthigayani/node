import {client} from "../index.js";
import bcrypt from "bcrypt"; // Step:2

// Step:1 Make copy of generateHashedPassword function and Command it for reference
// async function generateHashedPassword(password) { // await works on async function and top level module only. So we convert function to async function.
//   const No_OF_ROUNDS = 10;
//   const salt = await bcrypt.genSalt(No_OF_ROUNDS); // Salt generation take some time. So we used await.
//   const hashedPassword = await bcrypt.hash(password, salt); // hashedPassword depends on salt value. So we used await.
//   console.log(salt);
//   console.log(hashedPassword);
// }
// generateHashedPassword("password@123"); // function Call.

export async function generateHashedPassword(password) { // Step:3 export
  const No_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(No_OF_ROUNDS); // Salt generation take some time. So we used await.
  const hashedPassword = await bcrypt.hash(password, salt); // hashedPassword depends on salt value. So we used await.
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword; // Step:5
}
// generateHashedPassword("password@123"); // Step:4 No need of function Call here. Make this function call in user.route.js

export async function createUser(data) {
  // db.users.insertOne(data) // db command
  return await client.db("b40wd").collection("users").insertOne(data); // node command
}
