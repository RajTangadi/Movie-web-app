import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDb } from "./utils/connection.js";
import userRoute from "./routes/user.route.js";
import movieRoute from "./routes/movie.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api", movieRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
