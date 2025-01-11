import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "BHUPROTFOLIO" })
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log(`Connection failed deu to :${error}`);
    });
};

export default dbConnect;
