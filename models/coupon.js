import mongoose from "mongoose";
const Schema = mongoose.Schema;


const couponSchema = new Schema({
    coupon_name:{ type: String, required:true},
    coupon_desc:{ type: String, required:true},
    image:{ type: String, required:true },
    restaurantId:{ type: mongoose.Schema.Types.ObjectId, ref:"Restaurant", required: true},
    detail:{
            discount_type:{ type: String, required:true},
            discount:{ type: Number, required:true},
            upto:{ type: Number, required:true}
    },
    minPurchase:{ type: Number, required:true},
    validity:{
        startDate:{ type: Date, required:true},
        expDate:{ type: Date, required:true}
    }
},{timestamps: true});



export default mongoose.model("Coupon",couponSchema,"coupon");