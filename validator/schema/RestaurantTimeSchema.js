import Joi from "joi";

const RestaurantTimeSchema = Joi.object({
    day: Joi.string().min(3).required(),
    open: Joi.boolean().required(),
    from: Joi.string(),
    to: Joi.string()
});



export default RestaurantTimeSchema;