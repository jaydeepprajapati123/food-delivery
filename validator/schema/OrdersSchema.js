import Joi from "joi";

const OrderSchema = Joi.object({
    userId: Joi.string().required(),
    restaurantId: Joi.string().required(),
    address: Joi.string().required(),
    status: Joi.string().required(),
    couponDetail: Joi.object(),
    isApplied:Joi.boolean(),
    couponId: Joi.string(),
    products: Joi.array(),
    productId: Joi.string(),
    productName: Joi.number(),
    productImg: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
    sub_total: Joi.number(),
    billingDetails: Joi.object(),
    purchaseAmount: Joi.string(),
    gst: Joi.number(),
    deliveryCharge: Joi.string(),
    totalAmount: Joi.number(),
    couponDiscount: Joi.number(),
    totalPayableAmount: Joi.number(),
    paymentDetail: Joi.object(),
    paymentId: Joi.string()
});



export default OrderSchema;