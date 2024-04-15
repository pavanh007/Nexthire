import mongoose from "mongoose";

const connectToMongoDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("database: connection established");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
  });
  
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
