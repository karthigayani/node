import express from "express";
import { getMovies, getMovieById, createMovies, deleteMovieById, updateMovieById } from "../services/movies.service.js";
const router = express.Router();
// // Task 1 
// // http://localhost:4000/movies - movies (data)

// const movies = [
//     {
//     "id": "99",
//     "name": "Vikram",
//     "poster": "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
//     "rating": 8.4,
//     "summary": "Members of a black ops team must track and eliminate a gang of masked murderers.",
//     "trailer": "https://www.youtube.com/embed/OKBMCL-frPU"
//     },
//     {
//     "id": "100",
//     "name": "RRR",
//     "poster": "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
//     "rating": 8.8,
//     "summary": "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
//     "trailer": "https://www.youtube.com/embed/f_vbAtFSEc0"
//     },
//     {
//     "id": "101",
//     "name": "Iron man 2",
//     "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//     "rating": 7,
//     "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//     "trailer": "https://www.youtube.com/embed/wKtcmiifycU"
//     },
//     {
//     "id": "102",
//     "name": "No Country for Old Men",
//     "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//     "rating": 8.1,
//     "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//     "trailer": "https://www.youtube.com/embed/38A__WT3-o0"
//     },
//     {
//     "id": "103",
//     "name": "Jai Bhim",
//     "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//     "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//     "rating": 8.8,
//     "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
//     },
//     {
//     "id": "104",
//     "name": "The Avengers",
//     "rating": 8,
//     "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//     "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//     "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8"
//     },
//     {
//     "id": "105",
//     "name": "Interstellar",
//     "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//     "rating": 8.6,
//     "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//     "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
//     },
//     {
//     "id": "106",
//     "name": "Baahubali",
//     "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//     "rating": 8,
//     "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//     "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI"
//     },
//     {
//     "id": "107",
//     "name": "Ratatouille",
//     "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//     "rating": 8,
//     "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//     "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w"
//     },
//     {
//     "name": "PS2",
//     "poster": "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyNDExMjcyMzA@._V1_.jpg",
//     "summary": "Ponniyin Selvan: I is an upcoming Indian Tamil-language epic period action film directed by Mani Ratnam, who co-wrote it with Elango Kumaravel and B. Jeyamohan",
//     "rating": 8,
//     "trailer": "https://www.youtube.com/embed/KsH2LA8pCjo",
//     "id": "108"
//     },
//     {
//     "name": "Thor: Ragnarok",
//     "poster": "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_.jpg",
//     "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\\n of researchers, to find a new planet for humans.",
//     "rating": 8.8,
//     "trailer": "https://youtu.be/NgsQ8mVkN8w",
//     "id": "109"
//     }
//     ];

// Task 1 -> Getting data from local file
//     app.get("/movies", function (request, response) { // "/" -> path
//         response.send(movies);
//       });

// // Task 1 -> Getting data from database(mongoDB)
//   app.get("/movies", async function (request, response) { 
//     // db.movies.find({}) // mongodb command
//     // const movies = await client.db("b40wd").collection("movies").find({});

//     // Cursor - Pagination | toArray() used to converts Cursor -> Array
//     const movies = await client.db("b40wd").collection("movies").find({}).toArray();
//     console.log(movies);
//     response.send(movies);
//   });

// Task 1 -> Getting all data from database(mongoDB) with "filter using request.query"
router.get("/", async function (request, response) { 
    if(request.query.rating){
      request.query.rating = +request.query.rating; // Converting datatype string to number // because request.query returns string
    }
    console.log(request.query);
     // db.movies.find({}) // mongodb command
    const movies = await getMovies(request);
    console.log(movies);
    response.send(movies);
  });
  
  
  // Task 2
  // http://localhost:4000/movies/99 - movie data in id-99
  
  // Task 2 -> Getting data from local file
  // app.get("/movies/:id", function (request, response) { 
  //   const {id} = request.params;
  //   console.log(request.params, id);
  //   // const movie = ..... ?
  //   // const movie = movies.filter((mv) => mv.id === id); // filter returns array
  //   // const movie = movies.filter((mv) => mv.id === id)[0]; // removing array or extracting the value in array
  
  //   // find method returns value
  //   const movie = movies.find((mv) => mv.id === id);
  //   console.log(movie);
  //   // response.send(movie);
  //   movie
  //   ? response.send(movie)
  //   : response.status(404).send({message: "Movie not found"});
  
  // });
  
  // Task 2 -> Getting data from database(mongoDB)
  // app.get("/movies/:id", function (request, response) { 
    router.get("/:id", async function (request, response) { // Step:5 we are using await, await works in async function and top-level module only. So we put async here.
    const {id} = request.params;
    console.log(request.params, id);
    
    // const movie = movies.find((mv) => mv.id === id); // Step:1 command it
    // db.movies.findOne({id: '100'}); // Step:2 mongodb command 
    // const movie = client.db("b40wd").collection("movies").findOne({ id: "100" }); // Step:3 linking node with mongodb
    // const movie = await client.db("b40wd").collection("movies").findOne({ id: "100" }); // Step:4 It will takes some time to get the data so we put await here
    const movie = await getMovieById(id); // Step:6 for getting movie based on id
    console.log(movie);
   
    movie
    ? response.send(movie)
    : response.status(404).send({message: "Movie not found"});
  
  });
  
  // Sending data from postman to node
  
  // template
  // app.get("/movies", function (request, response) { // "/" -> path
  //   response.send(movies);
  // }); 
  
  // app.post("/movies", express.json(), async function (request, response) { // Step:8
  router.post("/", async function (request, response) {
  // app.post("/movies", async function (request, response) { // step:1 get -> post // Step:6 we are using await, await works in async function and top-level module only. So we put async here.
    const data = request.body; // step:2 storing postman request in variable data
    console.log(data); // step:3 viewing the data
    // db.movies.insertMany(data); // Step:4 mongodb command
  
    const result = await createMovies(data); // Step:5 converting mongo command to node command
    response.send(result); // step:7 movies -> result
  });
  
  // Task 3 -> Getting data from database(mongoDB) // Delete movie by id
  
  router.delete("/:id", async function (request, response) {
      const {id} = request.params;  
   // db.movies.deleteOne({id: '100' }) //mongo command
      const result = await deleteMovieById(id); 
      console.log(result);
     
      result.deletedCount > 0
      ? response.send({message: "Movie Deleted successfully"})
      : response.status(404).send({message: "Movie not found"});
    
    });
  
  // Task 4 -> Getting data from database(mongoDB) // Update movie by id
  
  router.put("/:id", async function (request, response) { 
      const {id} = request.params;
      const data = request.body; 
      // db.movies.updateOne({ id: '99'}, { $set: {rating: 9 } }) //mongo command
      // const result = await client.db("b40wd").collection("movies").updateOne({ id: '99'}, { $set: {rating: 9 } }); 
      const result = await updateMovieById(id, data); 
      console.log(result);
     
      response.send(result);
    });

export default router;

