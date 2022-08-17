import Joi from "joi";

const ProductSchema = Joi.object({
    product_name: Joi.string().required(),
    product_desc: Joi.string().required(),
    image: Joi.string().required(),
    categoryId: Joi.string().required(),
    restaurantId: Joi.string().required(),
    varients: Joi.array(),
    size: Joi.string(),
    price: Joi.number(),
    extra: Joi.array(),
    name: Joi.string(),
    rate: Joi.number(),
    rating: Joi.number(),
    recommended: Joi.boolean()
});



export default ProductSchema;