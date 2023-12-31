// const express = require("express"); // "type": "commonjs" // 3rd party package import
import express from "express"; // "type" : "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL);
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";
// import bcrypt from "bcrypt";

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

// async function generateHashedPassword(password) { // await works on async function and top level module only. So we convert function to async function.
//   const No_OF_ROUNDS = 10;
//   const salt = await bcrypt.genSalt(No_OF_ROUNDS); // Salt generation take some time. So we used await.
//   const hashedPassword = await bcrypt.hash(password, salt); // hashedPassword depends on salt value. So we used await.
//   console.log(salt);
//   console.log(hashedPassword);
// }
// generateHashedPassword("password@123"); // function Call.

export {client};

// // Day-10
// const express = require("express"); // 3rd party package imported
// const app = express(); // Calling the imported package and we get app. This app contains different rest API methods post, get, put, delete.

// const PORT = 4000; // use port 4000

// // Step:1 get the data from the link -> https://codepen.io/ragavkumarv/pen/PoJWbJj
// const movies = [
//   {
//   "id": "99",
//   "name": "Vikram",
//   "poster": "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
//   "rating": 8.4,
//   "summary": "Members of a black ops team must track and eliminate a gang of masked murderers.",
//   "trailer": "https://www.youtube.com/embed/OKBMCL-frPU"
//   },
//   {
//   "id": "100",
//   "name": "RRR",
//   "poster": "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
//   "rating": 8.8,
//   "summary": "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
//   "trailer": "https://www.youtube.com/embed/f_vbAtFSEc0"
//   },
//   {
//   "id": "101",
//   "name": "Iron man 2",
//   "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//   "rating": 7,
//   "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//   "trailer": "https://www.youtube.com/embed/wKtcmiifycU"
//   },
//   {
//   "id": "102",
//   "name": "No Country for Old Men",
//   "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//   "rating": 8.1,
//   "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//   "trailer": "https://www.youtube.com/embed/38A__WT3-o0"
//   },
//   {
//   "id": "103",
//   "name": "Jai Bhim",
//   "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//   "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//   "rating": 8.8,
//   "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
//   },
//   {
//   "id": "104",
//   "name": "The Avengers",
//   "rating": 8,
//   "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//   "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//   "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8"
//   },
//   {
//   "id": "105",
//   "name": "Interstellar",
//   "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//   "rating": 8.6,
//   "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//   "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
//   },
//   {
//   "id": "106",
//   "name": "Baahubali",
//   "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//   "rating": 8,
//   "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//   "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI"
//   },
//   {
//   "id": "107",
//   "name": "Ratatouille",
//   "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//   "rating": 8,
//   "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//   "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w"
//   },
//   {
//   "name": "PS2",
//   "poster": "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyNDExMjcyMzA@._V1_.jpg",
//   "summary": "Ponniyin Selvan: I is an upcoming Indian Tamil-language epic period action film directed by Mani Ratnam, who co-wrote it with Elango Kumaravel and B. Jeyamohan",
//   "rating": 8,
//   "trailer": "https://www.youtube.com/embed/KsH2LA8pCjo",
//   "id": "108"
//   },
//   {
//   "name": "Thor: Ragnarok",
//   "poster": "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_.jpg",
//   "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\\n of researchers, to find a new planet for humans.",
//   "rating": 8.8,
//   "trailer": "https://youtu.be/NgsQ8mVkN8w",
//   "id": "109"
//   }
//   ]

// app.get("/", function (request, response) {
//   response.send("🙋‍♂️, 🌏 🎊✨🤩");
// }); // applying get method : Here “/ ” -> path (Home page) So when you open home page, the callback function will run. In that callback we are passing 2 objects request and response.
// // In this code we are telling when we open the home page, we will get the response 🙋‍♂️, 🌏 🎊✨🤩 .


// app.get("/movies", function (request, response) {
//   response.send(movies);
// }); // Step:2

// app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`)); // Starting your app. When your app is started the callback function executed. So you will get the message inside it.

// // Task 1
// // http://localhost:4000/movies - movies (data)