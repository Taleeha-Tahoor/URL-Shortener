import mongoose from "mongoose";

export async function connectDb(url){
  return mongoose.connect(url);
}

