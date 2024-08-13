import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user-routes.js';
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-routes.js";
import errorHandler from "./errorHandler.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const port=5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://ankushrana9458:${process.env.MONGODB_PWD}@cluster0.38osesy.mongodb.net/?retryWrites=true&w=majority`,
    );
    console.log("Connected to Database");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); // Exit process with failure
  }
};

// Start server
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Initialize application
const init = async () => {
  await connectDB();
  startServer();
};

init();