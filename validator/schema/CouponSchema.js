import Joi from "joi";

const CouponSchema = Joi.object({
    coupon_name: Joi.string().required(),
    coupon_desc: Joi.string().required(),
    image: Joi.string().required(),
    restaurantId: Joi.string().required(),
    discount_type: Joi.string().required(),
    discount: Joi.number().required(),
    upto: Joi.number().required(),
    minPurchase: Joi.number().required(),
    startDate: Joi.date().required(),
    expDate: Joi.date().required()
});



export default CouponSchema;