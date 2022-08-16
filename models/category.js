import mongoose from "mongoose";
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name:{ type: String, required:true},
    image:{ type: String, required: true},
    restaurantId:{ type: mongoose.Schema.Types.ObjectId, ref:"Restaurant"}
},{timestamps: true});



export default mongoose.model("Category",categorySchema,"category");