import express, { response } from "express";
import { createUser, generateHashedPassword, getUserByName } from "../services/user.service.js"; 
const router = express.Router(); 
import bcrypt from "bcrypt"; // Step:5
import jwt from "jsonwebtoken"; // Step:7 install and import jsonwebtoken

  router.post("/signup", async function (request, response) {
    const {username, password} = request.body; 
    const userFromDB = await getUserByName(username); 
    console.log(userFromDB); 
   
    if(userFromDB){
      response.status(400).send({message: "Username already exist"});
    }
    else if(password.length < 8){ 
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

// Step:1 Duplicate the signup function as Login function
  router.post("/login", async function (request, response) {
    const {username, password} = request.body; 
    const userFromDB = await getUserByName(username); 
    console.log(userFromDB); 
      if(!userFromDB){ // Step:2 Condition applied --> userFromDB not present means
        response.status(401).send({message: "Invalid credentials"}); // Step: 3 When you mention username not exist it is also an information for hackers. So don't mention invalid username or password particularly. Always give general message.
      }
      else{ //Step:4 userFromDB present means you have to check password matches or not.
        const storedDBPassword = userFromDB.password;
        const isPasswordCheck = await bcrypt.compare(password, storedDBPassword); //bcrypt compares the login password with signup password
        console.log(isPasswordCheck);
        // Step:6 Password validation
        if(isPasswordCheck){
          const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY);  // Step:8 Generating token: 1st arg -> unique value , 2nd arg -> secret key
          // Step: 9 Go to .env file and define SECRET_KEY value.
          // response.send({message: "Successful Login"});
          response.send({message: "Successful Login", token: token}); // Step:10 send token with message.
          // Step: 11 Now run your node app "npm run dev" and go to your postman, in the login link press send. You will get successful login message with token. 
          // now copy the token value and pass which are the links you want at the headers by key and value. (Header is the comman place for all methods like GET,POST,Delete)
          // key -> x-auth-token (Industry standard name) and values -> token value.(copy the value inside the "").
          // Now you can send "x-auth-token" as middleware in the API's.
        }
        else{
          response.status(401).send({message: "Invalid credentials"}); 
        }
      } 
  });
  
export default router;

