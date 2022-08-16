import express from "express";
import { DB_URL } from "./config";
import router from "./routes";
import { ErrorHandler } from "./middlewares";

import mongoose from "mongoose";
mongoose.connect("mongodb+srv://jaydeep:jaydeep1153@cluster0.9l1hv.mongodb.net/food_delivery?retryWrites=true&w=majority").then(()=> console.log("database connected....")).catch((error)=> console.log('err:- ',error));

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