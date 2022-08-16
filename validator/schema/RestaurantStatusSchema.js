import Joi from "joi";

const RestaurantStatusSchema = Joi.object({
    resId: Joi.string().required(),
    open: Joi.boolean().required()
});



export default RestaurantStatusSchema;