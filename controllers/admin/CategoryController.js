import mongoose from "mongoose";
import { Category, Restaurant } from "../../models";
import { CustomErrorHandler } from "../../services";
import { CategorySchema } from "../../validator";

const CategoryController = {
    async addCategory(req,res,next){
        
        let isRes, save;

        // validate input fields
        const {error} = CategorySchema.validate(req.body);
        if(error){
            return next(error);
        }

        const {name, image, restaurantId} = req.body;

        // check if restaurantId is valid
        var result = mongoose.Types.ObjectId.isValid(restaurantId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
        }

        // check if restaurant registered with this id
        try{
            isRes = await Restaurant.find({_id: restaurantId});
         
            if(isRes == ''){
                return next(CustomErrorHandler.NotFound("No Restaurant registered with this ID"));
            }
        } catch(error){
            return next(error);
        }

         // save in collection
         const category = new Category({
            name,
            image,
            restaurantId
        });

        try{
            save = await category.save();
        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            message: "Product Category Registered Successfully!",
            data: save
        });
    },


    async updateCategory(req, res, next){
        
        let update, fetch;

        // validate input fields
        const {error} = CategorySchema.validate(req.body);
        if(error){
            return next(error);
        }

        const {name, image, catId} = req.body;

        // check if catId is valid
        var result = mongoose.Types.ObjectId.isValid(catId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Category ID."));
        }

        //remove restaurantId from req.body if get
        delete req.body['restaurantId'];
        console.log(req.body);

         // save in collection
        try{
            update = await Category.findOneAndUpdate({_id: catId}, req.body);

            if(!update){
                return next(CustomErrorHandler.NotFound("Category not Found"));
            }

            fetch = await Category.findOne({_id: catId}).select("-createdAt -updatedAt -__v");
        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            message: "Product Category Registered Successfully!",
            data: fetch
        });

    },


    async Category(req, res, next){

        let find;
        const catId = req.query.catId;

        if(!catId){
            return next(CustomErrorHandler.NotValid("catId is Required Field"));
        }

        // check if catId is valid
        var result = mongoose.Types.ObjectId.isValid(catId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Category ID."));
        }

        // get single category from collection
        try{
            find = await Category.findOne({_id: catId}).select("-createdAt -updatedAt -__v");

            if(!find){
                return next(CustomErrorHandler.NotFound("Category not Found"));
            }

        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            data: find
        });

    },


    async allCategory(req, res, next){

        let find;
        const resId = req.query.resId;

        if(!resId){
            return next(CustomErrorHandler.NotValid("resId is Required Field"));
        }

        // check if catId is valid
        var result = mongoose.Types.ObjectId.isValid(resId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
        }

        // get all category from collection
        try{
            find = await Category.find({restaurantId: resId}).select("-createdAt -updatedAt -__v");

            if(!find){
                return next(CustomErrorHandler.NotFound("Category not Found"));
            }

        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            data: find
        });

    },


    async removeCategory(req, res, next){

        let remove;
        const catId = req.query.catId;

        if(!catId){
            return next(CustomErrorHandler.NotValid("catId is Required Field"));
        }

        // check if catId is valid
        var result = mongoose.Types.ObjectId.isValid(catId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Category ID."));
        }

         // remove from collection
         try{
            remove = await Category.findOneAndRemove({_id: catId});

            if(!remove){
                return next(CustomErrorHandler.NotFound("Category not Found"));
            }

        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            message: "Product Category Removed Successfully!"
        });

    }
}



export default CategoryController;