import mongoose from "mongoose";

export const connectDB = async () => {
     try {
         mongoose.connect(process.env.MONGODB_URI!); // ! or as string 
         const conection = mongoose.connection;

         conection.on("connected", () => {
              console.log("Connected to MongoDB");
         });
         
         conection.on("error", (err) => {
              console.error("Error connecting to MongoDB:", err);
              process.exit();
         });

       
     } catch (error) {
          console.error("Error connecting to MongoDB:", error);
     }
};
