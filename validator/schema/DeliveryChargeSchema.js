import Joi, { required } from "joi";

const DeliveryChargeSchema = Joi.object({
    under_5: Joi.string().required(),
    above_5: Joi.string().required(),
    above_10: Joi.string().required()
});



export default DeliveryChargeSchema;