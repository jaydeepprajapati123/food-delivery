import Joi from "joi";

const UserRegisterSchema = Joi.object({
    userId: Joi.string().min(3).required(),
    name: Joi.string().min(3).max(30),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^[6-9]{1}[0-9]{9}$/).messages({ 'string.pattern.base': `Phone number is not Valid.` }),
    userImg: Joi.string(),
    notification_token: Joi.number()
});



export default UserRegisterSchema;