import client from "../index.js";

export async function CreateMovies(data) {
  return await client.db("b40wd").collection("movies").insertMany(data);
}
export async function UpdateMovieById(id, data) {
  return await client.db("b40wd").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function DeleteMovieById(id) {
  return await client.db("b40wd").collection("movies").deleteOne({ id: id });
}
export async function GetMovieById(id) {
  return await client.db("b40wd").collection("movies").findOne({ id: id });
}
export async function GetMovies(request) {
  return await client.db("b40wd").collection("movies").find(request.query).toArray();
}
