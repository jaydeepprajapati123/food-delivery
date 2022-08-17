import { User } from "../models";
import { CustomErrorHandler } from "../services";
import { UpdateUserSchema, AddressSchema} from "../validator";

const UserController = {
    async user(req,res,next){

        let result;
        const userId = req.query.userId;

        if (userId) {
            try {
                result = await User.findOne({ _id: userId }).select("-createdAt -updatedAt -__v");
                if (!result) {
                    return next( CustomErrorHandler.NotFound("No User Available With This ID") );
                }
            } catch (err) {
                console.log("err", err.message);
                return next(err.message);
            }
        } else {
            return next(CustomErrorHandler.NotValid("userId is Required Field"));
        }



        res.status(200).json({
            status: 1,
            data: result,
        });
    },

    async userNotification(req, res, next){

        let push, fetch;
        const { userId, notification_token} = req.body;

        
        //validation of input fields
        const { error } = UpdateUserSchema.validate(req.body);
        if (error) {
            console.log("err",error);
            return next(error);
        } 

        try{

            push = await User.findOneAndUpdate({ _id: userId },{ $addToSet: { notificationToken: notification_token } });
            if(!push){
                return next(CustomErrorHandler.NotFound("No User Available With This ID."));
            }

            fetch = await User.findOne({ _id: userId }).select("-createdAt -updatedAt -__v");

        } catch(error){
            console.log("err1",error);
            return next(error);
        }


        res.status(200).json({
            status: 1,
            msg: "Token Added",
            data: fetch
        });

    },

    async userUpdate(req,res,next){

        const userId = req.body.userId;
        let update,new_data;

        if (!userId) {
            return next(CustomErrorHandler.NotValid("userId is Required Field"));
        }

        //validation of input fields
        const { error } = UpdateUserSchema.validate(req.body);
        if (error) {
            console.log(error);
            return next(error);
        } 

        //Duplicate email checking
        if(req.body.email){
            try {
                const exist = await User.exists({ $and: [{ _id: { $ne: userId } }, { email: req.body.email }] });

                if (exist) {
                    return next(
                        CustomErrorHandler.AlreadyExist("Email Already Registered")
                    );
                }
            } catch (error) {
                return next(error);
            }
        }

        // remove userId from req.body as we don`t want to update it.
        delete req.body['userId'];

        // save data in database 
        try {
            update = await User.findOneAndUpdate({ _id: userId }, req.body);
            if (!update) {
                return next(
                    CustomErrorHandler.NotFound("No User Available With This ID.")
                );
            }
            
            new_data = await User.findOne({ _id: userId }).select("-createdAt -updatedAt -__v");
            
            console.log(new_data);
        } catch (err) {
            console.log("err", err.message);
            return next(err.message);
        }


        res.status(200).json({
            status: 1,
            message: "User Updated Successfully!!",
            data: new_data
        });
    },

    async addAddress(req,res,next){
        
        let add, fetch;
        let isType = false;
        const userId = req.body.userId;

        if(userId){

            //validation of input fields
            const { error } = AddressSchema.validate(req.body);
            if (error) {
                console.log(error);
                return next(error);
            } 

            const {type, line, locality, city, state, pincode } = req.body;

            if(!type){
                return next(CustomErrorHandler.NotValid(" 'type' is Required Field"));
            }

            // check address type
            const all_types = ['Home','Office','Other'];
            const inside = all_types.includes(type);
            if(inside != true){
                return next(CustomErrorHandler.NotAllowed(`type ${type} is not allowed. Value of 'type' should be of Home, Office and Other.`));
            }

            // make object named address
            const address = {
                type,
                line,
                locality,
                city,
                state,
                pincode
            }


            // check if this type of address already exist
            try {
                
                const exist = await User.findOne({ _id: userId });
                const address = exist.address;

                address.forEach(address => {
                    if(type == address.type){
                        isType = true;
                    }
                });

            } catch (err) {
                console.log("err", err.message);
                return next(err.message);
            }


            // save data in database 
            try{

                if(isType == true){
                    return next(CustomErrorHandler.AlreadyExist(`Address type ${type} already exist.`));
                }
        
                add = await User.findOneAndUpdate({ _id: userId },{ $push: { address }});
                if (!add) {
                    return next(CustomErrorHandler.NotFound("No User Available With This ID."));
                }

                fetch = await User.findOne({ _id: userId }).select("-createdAt -updatedAt -__v");

            }catch(err){
                console.log("err", err.message);
                return next(err.message);
            }
                
        } else{
            return next(CustomErrorHandler.NotValid("userId is Required Field"));
        }



        res.status(200).json({
            status: 1,
            message: "Address Added Successfully!!",
            data: fetch
        });
    },



    async updateAddress(req,res,next){
        
        let update, remove, fetch;
        let isType = false;
        const userId = req.body.userId;

        if(userId){

            //validation of input fields
            const { error } = AddressSchema.validate(req.body);
            if (error) {
                console.log(error);
                return next(error);
            } 

            const {type, line, locality, city, state, pincode } = req.body;

            if(!type){
                return next(CustomErrorHandler.NotValid(" 'type' is Required Field"));
            }

            // check address type
            const all_types = ['Home','Office','Other'];
            const inside = all_types.includes(type);
            if(inside != true){
                return next(CustomErrorHandler.NotAllowed(`type ${type} is not allowed. Value of 'type' should be of Home, Office and Other.`));
            }

            // make object named address
            const address = {
                type,
                line,
                locality,
                city,
                state,
                pincode
            }


            // check if this type of address already exist
            try {
                
                const exist = await User.findOne({ _id: userId });
                const address = exist.address;

                address.forEach(address => {
                    if(type == address.type){
                        isType = true;
                    }
                });

            } catch (err) {
                console.log("err", err.message);
                return next(err.message);
            }


            // save data in database 
            try{

                if(isType == true){

                    // remove existing array
                    remove = await User.findOneAndUpdate({ _id: userId },{ $pull: { address: { type }}});
                    if(!remove){
                        console.log("error occure when remove old array");
                    } 
        
                    update = await User.findOneAndUpdate({ _id: userId },{ $push: { address }});
                    if (!update) {
                        return next(CustomErrorHandler.NotFound("No User Available With This ID."));
                    }
                    console.log(update);

                    fetch = await User.findOne({ _id: userId }).select("-createdAt -updatedAt -__v");

                } else{
                    return next(CustomErrorHandler.NotAllowed(`Update Failed. can't Update Unknown Type of Address. `));
                }
                
                

            }catch(err){
                console.log("err", err.message);
                return next(err.message);
            }
                
        } else{
            return next(CustomErrorHandler.NotValid("userId is Required Field"));
        }



        res.status(200).json({
            status: 1,
            message: "Address Update Successfully!!",
            data: fetch
        });
    },

    async removeAddress(req, res, next){
        console.log(req.query);

        let remove, fetch;
        const userId = req.query.userId;
        const type = req.query.address_type;

        if(userId){

            if(!type){
                return next(CustomErrorHandler.NotValid(" `address_type` is Required Field"));
            }

            // check address type
            const all_types = ['Home','Office','Other'];
            const inside = all_types.includes(type);
            if(inside != true){
                return next(CustomErrorHandler.NotAllowed(`type ${type} is not allowed. Value of 'type' should be of Home, Office and Other.`));
            }

            try{

                // remove existing array
                remove = await User.findOneAndUpdate({ _id: userId },{ $pull: { address: { type }}});
                if(!remove){
                    console.log("error occure when remove old array");
                } 

                fetch = await User.findOne({ _id: userId }).select("-createdAt -updatedAt -__v");

            } catch(err){
                return next(err.message);
            }

        }else{
            return next(CustomErrorHandler.NotValid("userId is Required Field"));
        }



        res.status(200).json({
            status: 1,
            message: "Address Remove Successfully!",
            data: fetch
        });
    }
}



export default UserController;