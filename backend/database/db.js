import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DBconnection = async () => {
   const MONGODB_URL = process.env.MONGODB_URI;
   try {
      await mongoose.connect(MONGODB_URL);
      console.log("DB connection established!");

   } catch (err) {
      console.log(" Error connecting to MONGODB " + err);
   }
}

export default DBconnection;

