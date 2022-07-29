import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import frunRouter from "./routes/frun.routes.js";


const app = express();

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter); // http://localhost:8000/users/signup
app.use("/frun", frunRouter);

const MONGODB_URL = "mongodb+srv://othea32:oODLpkLYDRbPgiHg@cluster0.4fme3.mongodb.net/funrun_db?retryWrites=true&w=majority"

const port = 8000;

mongoose.connect(MONGODB_URL)
 .then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
 })
 .catch((error) => console.log(`${error} did not connect`));

// oODLpkLYDRbPgiHg
// mongodb+srv://othea32:<password>@cluster0.4fme3.mongodb.net/?retryWrites=true&w=majority