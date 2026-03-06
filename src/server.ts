import express from "express";
import uploadRouter from "./routes/uploadRoute.js";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Trust proxy for production deployments
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors());

app.use("/api", uploadRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Document Processor API",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
