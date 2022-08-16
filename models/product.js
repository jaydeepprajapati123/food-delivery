import mongoose from "mongoose";
const Schema = mongoose.Schema;


const productSchema = new Schema({
    product_name:{ type: String},
    image:{ type: String},
    product_desc:{ type: String},
    categoryId:{ type: mongoose.Schema.Types.ObjectId, ref:"Category" },
    restaurantId:{ type: mongoose.Schema.Types.ObjectId, ref:"Restaurant"},
    varients:{
        type: Array,
        items:{
            size:{ type: String},
            price:{ type: Number},
            extra:{ 
                type: Array,
                items:{
                    name:{ type: String},
                    rate:{ type: Number}
                }
            }
        }
    },
    rating:{ type: Number}
},{timestamps: true});



export default mongoose.model("Product",productSchema,"product");