import express from "express";
import { createUser, generateHashedPassword, getUserByName } from "../services/user.service.js"; // Step:4 import getUserByName
const router = express.Router(); 

  router.post("/signup", async function (request, response) {
    const {username, password} = request.body; 
    // Validation to avoid saving multiple data in same username.
    // const userFromDB = getUserByName(username); // Step:1
    const userFromDB = await getUserByName(username); // Step:2
   // Step:3 in `user.service.js`, get the temple from movies.service.js and make edit 
    console.log(userFromDB); // Step:5 
   // Step:6 In your postman in the signup link create a username You will get the username and hashedpassword in terminal if it is present. If not it shows null
    
   // Step:7 Passing condition 
   if(userFromDB){
    response.status(400).send({message: "Username already exist"});
   }
   else if(password.length < 8){ // Step:8 password validation
    response.status(400).send({message: "Password must be at least 8 characters"});
   }
   else {
    const hashedPassword = await generateHashedPassword(password); 
    const result = await createUser({
      username: username,
      password: hashedPassword
    });
    response.send(result);
   }  
  });
  
export default router;

