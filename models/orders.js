import mongoose from "mongoose";
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref:"User" },
    restaurantId:{ type: mongoose.Schema.Types.ObjectId, ref:"Restaurant" },
    address:{ type: String},
    status:{ type: String },
    couponDetail:{
        isApplied:{ type: Boolean},
        couponId:{ type: mongoose.Schema.Types.ObjectId, ref:"Coupon" }
    },
    products:{
        type: Array,
        items:{
            productId:{ type: mongoose.Schema.Types.ObjectId, ref:"Product" },
            productName:{ type: String},
            productImg:{ type: String},
            price:{ type: Number},
            quantity:{ type: Number},
            sub_total:{ type: Number}            
        }
    },
    billingDetails:{
        purchaseAmount:{ type: Number},
        gst:{ type: Number},
        deliveryCharge:{ type: Number},
        totalAmount:{ type: Number},
        couponDiscount:{ type: Number},
        totalPayableAmount:{ type: Number}        
    },
    paymentDetail:{
        paymentId:{ type: String}
    }
},{timestamps: true});



export default mongoose.model("Order",orderSchema,"orders");