import express from "express";
import router from "./routes/router.js";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: "*",
};

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");    
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api", router);

//gobal error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err,
    message: err.message,
  });
});
app.listen(PORT, () => {
  console.log("server running on port" + PORT);
});