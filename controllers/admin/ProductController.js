import mongoose from "mongoose";
import { Category, Order, Product, Restaurant, User } from "../../models";
import { CustomErrorHandler } from "../../services";
import { OrderSchema, ProductSchema } from "../../validator";


const ProductController = {
    async addProduct(req, res, next){

        let match, save;
        console.log(req.body);

        const {product_name, product_desc, image, categoryId, restaurantId, varients, recommended, rating } = req.body;

        if(!restaurantId){
            return next(CustomErrorHandler.NotValid("restaurantId is Required Field"));
        }

        if(!categoryId){
            return next(CustomErrorHandler.NotValid("categoryId is Required Field"));
        }


        // check if categoryId and restaurantId is valid
        var result1 = mongoose.Types.ObjectId.isValid(restaurantId);
        if(result1 == false){
            return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
        }
        var result2 = mongoose.Types.ObjectId.isValid(categoryId);
        if(result2 == false){
            return next(CustomErrorHandler.NotValid("Invalid Category ID."));
        }


        //validation of input fields
        const { error } = ProductSchema.validate(req.body);
        if (error) {
            console.log(error);
            return next(error);
        } 


        //check categoryId is link with restaurantId
        try{
            match = await Category.findOne({_id: categoryId, restaurantId});

            if(match == null){
                return next(CustomErrorHandler.NotValid("Invalid categoryId or restaurantId"));
            }
        } catch(error){
            return next(error);
        }


         // save in collection
         
        const product = new Product({
            product_name, product_desc, image, categoryId, restaurantId, varients, recommended, rating
        });

        try{
            save = await product.save();
        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            message: "Product Added Successfully!",
            data: save
        });
    },


    async recommendedProduct(req, res, next){

        let data;

        try{

            data = await Product.find({recommended: true});
            
        } catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            data
        });
    },


    async allProduct(req, res, next){

        let data;

        try{

            data = await Product.find();

        } catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            data
        });
        
    },


    async searchProduct(req, res, next){
        console.log(req.query);

        let data;
        const search = req.query.q;

        try{
            data = await Product.aggregate([
                {
                    $search: {
                        index: 'product_name',
                        autocomplete: {
                            query: search,
                            path: "product_name",
                            fuzzy: {
                                maxEdits: 1,
                            }
                        }
                    },
                },
                {
                    $project: {
                        _v:0,
                        updatedAt:0
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                }
            ]);

            if(data == ''){
                return next(CustomErrorHandler.NotFound("Product not Found"));
            }
        } catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            data
        });
         

    },



    async filterProduct(req, res, next){

        let data;
        const catId = req.query.catId;

        if(!catId){
            return next(CustomErrorHandler.NotValid("'catId' is required field"));
        }

        // check if catId is valid
        var result = mongoose.Types.ObjectId.isValid(catId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Category ID."));
        }

        try{
            data = await Product.find({categoryId: catId});
            console.log(data);
            if(data == ''){
                return next(CustomErrorHandler.NotFound("Product not Found"));
            }
        } catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            data
        });
    },


    async saveOrder(req, res, next){

        let match, save;
        console.log(req.body);

        const {userId, restaurantId, address, status, couponDetail, products, billingDetails, paymentDetail } = req.body;

        if(!restaurantId){
            return next(CustomErrorHandler.NotValid("restaurantId is Required Field"));
        }

        if(!userId){
            return next(CustomErrorHandler.NotValid("userId is Required Field"));
        }


        // check if all ID is valid
        var result1 = mongoose.Types.ObjectId.isValid(restaurantId);
        if(result1 == false){
            return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
        }
        var result2 = mongoose.Types.ObjectId.isValid(userId);
        if(result2 == false){
            return next(CustomErrorHandler.NotValid("Invalid User ID."));
        }


        //validation of input fields
        const { error } = OrderSchema.validate(req.body);
        if (error) {
            console.log(error);
            return next(error);
        } 

        //check userId is exist 
        try{
            match = await User.findOne({_id: userId});

            if(match == null){
                return next(CustomErrorHandler.NotValid("Invalid userId"));
            }
        } catch(error){
            return next(error);
        }

        //check restaurantId is exist 
        try{
            match = await Restaurant.findOne({_id: restaurantId});

            if(match == null){
                return next(CustomErrorHandler.NotValid("Invalid restaurantId"));
            }
        } catch(error){
            return next(error);
        }


         // save in collection
         
        const order = new Order({
            userId, restaurantId, address, status, couponDetail, products, billingDetails, paymentDetail
        });

        try{
            save = await order.save();
        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            message: "Order Placed Successfully!",
            data: save
        });
    }
}



export default ProductController;