import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(process.env.mongo_uri).then(() => {
    console.log("connected to db");
  });
};

export { connectDB };
