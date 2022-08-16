import express from "express";
import { DB_URL } from "./config";
import router from "./routes";
import { ErrorHandler } from "./middlewares";

import mongoose from "mongoose";
mongoose.connect(DB_URL).then(()=> console.log("database connected....")).catch((error)=> console.log('err:- ',error));

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