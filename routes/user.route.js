import express from "express";
import { createUser, generateHashedPassword } from "../services/user.service.js"; // Step:8 VS code automatically make import statement for generateHashedPassword function. If not you have to do it.
const router = express.Router(); 

  router.post("/signup", async function (request, response) {
  
    // const data = request.body; // Step:6 
    const {username, password} = request.body; // Step:6 Put {username, password} instead of data.
    // console.log(data); Step:11 Command it. data is not present now.
    // const hashedPassword = generateHashedPassword(password); // Step:8 function call 
    const hashedPassword = await generateHashedPassword(password); // Step:10 async function call so we put await before
    // const result = await createUser({username, password}); // Step:7 When you send password directly your data can be readed. So if you send hashedPassword you can secure your data.
    const result = await createUser({username: username , password: hashedPassword}); // Step:9 Storing data in db. (Assigning username itself username, and hashedPassword to password. So that, if you send hashedPassword you can secure your data.)
    response.send(result); // sending response
  });
  
export default router;

