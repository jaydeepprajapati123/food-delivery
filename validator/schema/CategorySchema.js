import Joi from "joi";

const CategorySchema = Joi.object({
    catId: Joi.string(),
    name: Joi.string(),
    image: Joi.string(),
    restaurantId: Joi.string()
});



export default CategorySchema;