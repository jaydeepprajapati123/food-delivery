import Joi from "joi";

const UserRegisterSchema = Joi.object({
    userId: Joi.string().min(3).required(),
    email: Joi.string().email(),
    notification_token: Joi.number()
});



export default UserRegisterSchema;