import Joi from "joi";

const UserRegisterSchema = Joi.object({
    userId: Joi.string().min(3).required(),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^[6-9]{1}[0-9]{9}$/).messages({ 'string.pattern.base': `Phone number is not Valid.` }).required(),
    userImg: Joi.string().required(),
    notification_token: Joi.number()
});



export default UserRegisterSchema;