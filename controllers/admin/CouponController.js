import mongoose from "mongoose";
import { Coupon, Restaurant } from "../../models";
import { CustomErrorHandler } from "../../services";
import { CouponSchema } from "../../validator";


const CouponController = {
    async addCoupon(req, res, next){

        let isRes, save;

        // validate input fields
        const {error} = CouponSchema.validate(req.body);
        if(error){
            return next(error);
        }

        const { coupon_name, coupon_desc, image, restaurantId, discount_type, discount, upto, minPurchase, startDate, expDate } = req.body;

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

        // check if discount_type is from array 
        const types = ['A','P'];
        const isIn = types.includes(discount_type);
        if(isIn == false){
            return next(CustomErrorHandler.NotAllowed(`discount_type ${discount_type} is not allowed. Value of 'discount_type' should be of 'A', 'P'`));
        }
        if(discount_type == 'P'){
            if(discount >= 100){
                return next(CustomErrorHandler.NotValid("'discount' not valid"));
            }
        }

        // check if expDate less than startDate
        if(startDate >= expDate){
            return next(CustomErrorHandler.NotValid("'expDate' should be greater than 'startDate' "));
        }

         // save in collection
         const coupon = new Coupon({
            coupon_name,
            coupon_desc,
            image,
            restaurantId,
            detail:{
                discount_type,
                discount,
                upto
            },
            minPurchase,
            validity:{
                startDate,
                expDate
            }
        });

        try{
            save = await coupon.save();
        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            message: "Coupon Added Successfully!",
            data: save
        });

    },


    async allCoupon(req, res, next){

        let coupon;
        try{

            coupon = await Coupon.find().select("-createdAt -updatedAt -__v");

        } catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            data: coupon
        });

    },


    async singleCoupon(req, res, next){

        let find;
        const couponId = req.query.id;

        if(!couponId){
            return next(CustomErrorHandler.NotValid("couponId is Required Field"));
        }

        // check if couponId is valid
        var result = mongoose.Types.ObjectId.isValid(couponId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Coupon ID."));
        }

         // remove from collection
         try{
            find = await Coupon.findOne({_id: couponId}).select("-createdAt -updatedAt -__v");

            if(!find){
                return next(CustomErrorHandler.NotFound("Coupon not Found"));
            }

        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            data: find
        });
    },


    async removeCoupon(req, res, next){

        let remove;
        const couponId = req.query.couponId;

        if(!couponId){
            return next(CustomErrorHandler.NotValid("couponId is Required Field"));
        }

        // check if couponId is valid
        var result = mongoose.Types.ObjectId.isValid(couponId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Coupon ID."));
        }

         // remove from collection
         try{
            remove = await Coupon.findOneAndRemove({_id: couponId});

            if(!remove){
                return next(CustomErrorHandler.NotFound("Coupon not Found"));
            }

        }catch(error){
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            message: "Coupon Removed Successfully!"
        });

    }

}



export default CouponController;