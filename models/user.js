import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: Number },
    userImg: { type: String },
    wallet: {
        balance:{ type: Number, default: 0 } 
    },
    address:{
        type: Array,
        items:{
            type:{ type: String},
            line1:{ type: String},
            locality:{ type: String},
            city:{ type: String},
            state:{ type: String},
            pincode:{ type: Number}
        }
    },
    notificationToken:{ type: Array }
},{timestamps:true});



export default mongoose.model("User",userSchema,"users");