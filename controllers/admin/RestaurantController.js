import mongoose from "mongoose";
import { Restaurant } from "../../models";
import { CustomErrorHandler } from "../../services";
import { AddressSchema, DeliveryChargeSchema, 
    RestaurantRegisterSchema, RestaurantStatusSchema, 
    RestaurantTimeSchema, UpdateRestaurantSchema } 
from "../../validator";

const RestaurantController = {
    async register(req,res,next){

        let save;

        // validate input fields
        const {error} = RestaurantRegisterSchema.validate(req.body);
        if(error){
            // console.log(error.message);
            return next(error);
        } 
        

        const { name, email, phone, line, locality, city, state, pincode } = req.body;

        //duplication email or user error checking
        try {
            const exist = await Restaurant.find({ email });

            if(exist != ''){
                return next(CustomErrorHandler.AlreadyExist("Email Already Registered"));
            }
            
        } catch (error) {
            return next(error);
        }


         // save in collection
         const restaurant = new Restaurant({
            name,
            email,
            phone,
            address:{
                line,
                locality,
                city,
                state,
                pincode
            }
        });

        try{
            save = await restaurant.save();
        }catch(error){
            console.log("tc",error);
            return next(error);
        }


        return res.status(200).json({
            status: 1,
            message: "Restaurant Registered Successfully!",
            data: save
        });
    },



    async updateRestaurant(req, res, next){

        let update, fetch;
        const resId =req.body.resId;

        if(!resId){
            return next(CustomErrorHandler.NotValid("resId is Required Field"));
        }

        // check if id is valid
        var result = mongoose.Types.ObjectId.isValid(resId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
        }

        //validation of input fields
        const { error } = UpdateRestaurantSchema.validate(req.body);
        if (error) {
            console.log(error);
            return next(error);
        } 

        // save data in database 
        try{
                    
            update = await Restaurant.findOneAndUpdate({ _id : resId }, req.body );
            if (!update) {
                return next(CustomErrorHandler.NotFound("No Restaurant Available With This ID."));
            }

            console.log(update);

            fetch = await Restaurant.findOne({ _id : resId });

        }catch(err){
            console.log("err", err.message);
            return next(err.message);
        }



        res.status(200).json({
            status: 1,
            message: "Restaurant Updated Successfully!!",
            data: fetch
        });

    },


    async updateAddress(req, res, next){

        let update,fetch;
        const resId = req.body.resId;

        if(resId){

            // check if id is valid
            var result = mongoose.Types.ObjectId.isValid(resId);
            if(result == true){

                //validation of input fields
                const { error } = AddressSchema.validate(req.body);
                if (error) {
                    console.log(error);
                    return next(error);
                } 

                const { line, locality, city, state, pincode } = req.body;

                // make object named address
                const data = {
                    line,
                    locality,
                    city,
                    state,
                    pincode
                }


                // save data in database 
                try{
                    
                    update = await Restaurant.findOneAndUpdate({ _id : resId }, {address:data} );
                    if (!update) {
                        return next(CustomErrorHandler.NotFound("No Restaurant Available With This ID."));
                    }

                    console.log(update);

                    fetch = await Restaurant.findOne({ _id : resId });

                }catch(err){
                    console.log("err", err.message);
                    return next(err.message);
                }

            } else{
                return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
            }
    
        } else{
            return next(CustomErrorHandler.NotValid("resId is Required Field"));
        }



        res.status(200).json({
            status: 1,
            message: "Address Updated Successfully!!",
            data: fetch
        });

    },

    async manageTime(req, res, next){

        let isExist,add,update,fetch;
        console.log(req.body);
        const resId = req.body.resId;

        // check if id is valid
        var result = mongoose.Types.ObjectId.isValid(resId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
        }

        //remove resId from req.body
        delete req.body['resId'];

        //validation of input fields
        const { error } = RestaurantTimeSchema.validate(req.body);
        if (error) {
            console.log(error);
            return next(error);
        } 

        const { day, open } = req.body;

        if( open == 'true'){
            const from = req.body.from;
            const to = req.body.to;

            if(!from || !to){
                return next(CustomErrorHandler.NotValid("'from' and 'to' required fields for open day"));
            }
        } else{
                delete req.body['from'];
                delete req.body['to'];
        }

        // check day
        const all_days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        if(!all_days.includes(day)){
            return next(CustomErrorHandler.NotAllowed("day is not valid"));
        }

        // check if this type of address already exist
        try {
                
            const exist = await Restaurant.findOne({ _id: resId });
            if(!exist){
                return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
            }
            const time = exist.time;

            time.forEach(time => {
                if(day == time.day){
                    isExist = true;
                }
            });

            if(isExist == true){
                update = await Restaurant.findOneAndUpdate({ _id: resId, 'time.day':day },{ $set: { 'time.$': req.body }});
            } else{
                add = await Restaurant.findOneAndUpdate({ _id: resId },{ $push: { time: req.body }});
            }

            fetch = await Restaurant.findOne({ _id: resId});

        } catch (err) {
            console.log("err4", err.message);
            return next(err.message);
        }



        res.status(200).json({
            status: 1,
            message: "Restaurant Time Updated Successfully!!",
            data: fetch
        });
    },



    async deliveryCharge(req, res, next){

        let charge, fetch;
        const resId = req.body.resId;

        // check if id is valid
        var result = mongoose.Types.ObjectId.isValid(resId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
        }

        //remove resId from req.body
        delete req.body['resId'];

        //validation of input fields
        const { error } = DeliveryChargeSchema.validate(req.body);
        if (error) {
            console.log(error);
            return next(error);
        } 

        //save in database
        try{

            charge = await Restaurant.findOneAndUpdate({ _id: resId },{ delivery_charge: req.body });
            if(charge){
                fetch = await Restaurant.find({ _id: resId });
            } else{
                return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
            }

        }catch(error){
            return next(error);
        }


        res.status(200).json({
            status: 1,
            message: "Restaurant Charges Updated Successfully!!",
            data: fetch
        });

    },


    async status(req, res, next){
        
        let status, fetch;
        const resId = req.body.resId;
        const open = req.body.open;

        // check if id is valid
        var result = mongoose.Types.ObjectId.isValid(resId);
        if(result == false){
            return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
        }

        //validation of input fields
        const { error } = RestaurantStatusSchema.validate(req.body);
        if (error) {
            console.log(error);
            return next(error);
        } 

        //save in database
        try{

            status = await Restaurant.findOneAndUpdate({ _id: resId },{ isOpen: open });
            if(status){
                fetch = await Restaurant.find({ _id: resId });
            } else{
                return next(CustomErrorHandler.NotValid("Invalid Restaurant ID."));
            }

        }catch(error){
            return next(error);
        }


        res.status(200).json({
            status: 1,
            message: "Restaurant Charges Updated Successfully!!",
            data: fetch
        });

    }
}

export default RestaurantController;