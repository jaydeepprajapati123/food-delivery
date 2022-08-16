import { User } from "../models";
import { CustomErrorHandler } from "../services";
import { UserRegisterSchema } from "../validator";

const RegisterController = {
    async register(req,res,next) {

        let save;
        console.log(req.body);

        // validate input fields
        const {error} = UserRegisterSchema.validate(req.body);
        if(error){
            console.log("v",error);
            console.log(error.message);
            return next(error);
        }

        const { userId, name, email, phone, userImg, notification_token } = req.body;

        //duplication email or user error checking
        try {
            const exist = await User.findOne({$or:[{ userId },{ email }]});

            if(exist != null){
                console.log(exist);
                return next(CustomErrorHandler.AlreadyExist("User Already Registered"));
                // if (exist[0].email == email) {
                //     return next(CustomErrorHandler.AlreadyExist("Email Already Registered"));
                // }
            }
            
        } catch (error) {
            console.log(error);
            return next(error);
        }

        // save in collection
        const user = new User({
            userId,
            name,
            email,
            phone,
            userImg,
            notificationToken: notification_token
        });

        try{
            save = await user.save();
        }catch(error){
            console.log("tc",error);
            return next(error);
        }



        res.status(200).json({
            status: 1,
            msg: "User Registered Successfully!",
            data: save
        });

    }
}


export default RegisterController;