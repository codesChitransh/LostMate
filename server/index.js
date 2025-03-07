import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import signuprouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());  
dotenv.config();

const mongoURI = process.env.MONGO_URI; // Correct variable name

if (!mongoURI) {
  console.error("MongoDB URI is undefined! Check your .env file.");
  process.exit(1); 
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

  app.use(express.json());
  app.use('/server/auth', signuprouter);

app.listen(4008, () => {
  console.log("Server is listening on port 4009");
});
