import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address:{
        line:{ type: String},
        locality:{ type: String},
        city:{ type: String},
        state:{ type: String},
        pincode:{ type: Number}
    },
    time:{
        type: Array,
        items:{
            day:{ type: String},
            open:{ type: Boolean},
            from:{ type: String},
            to:{ type: String}
        }
    },
    delivery_charge:{
        under_5:{ type: Number},
        above_5:{ type: Number},
        above_10:{ type: Number}
    },
    isOpen: { type: Boolean, default: true}
},{timestamps:true});



export default mongoose.model("Restaurant",RestaurantSchema,"restaurants");