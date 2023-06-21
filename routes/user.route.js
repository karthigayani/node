import express from "express";
import { createUser } from "../services/user.service.js";
const router = express.Router(); 

  router.post("/signup", async function (request, response) {
  
    const data = request.body; 
    console.log(data); 
    // db.users.insertOne(data) // db command
    const result = await createUser(data); // node command in user.service.js file
    response.send(result); // sending response
  });
  
export default router;

