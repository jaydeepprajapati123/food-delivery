import express from "express";
import router from "./routes";
import { ErrorHandler } from "./middlewares";
import {DB_PORT} from "./config";

import mongoose from "mongoose";

const MONGO = process.env.DB_URL || DB_PORT;
mongoose.connect(MONGO,{useNewUrlParser: true}).then(()=> console.log("database connected....")).catch((error)=> console.log('err:- ',error));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());                           // put this always above router

app.use(router);

// Middlewares
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server Start on PORT: ${PORT}`);
})