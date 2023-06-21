import {client} from "../index.js";

export async function createUser(data) {
  // db.users.insertOne(data) // db command
  return await client.db("b40wd").collection("users").insertOne(data); // node command
}
