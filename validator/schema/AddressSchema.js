import Joi from "joi";

const AddressSchema = Joi.object({
    userId: Joi.string(),
    resId: Joi.string(),
    type: Joi.string(),
    line: Joi.string().required(),
    locality: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().regex(/^[1-9]{1}[0-9]{5}$/).messages({ 'string.pattern.base': `Pincode is not Valid.` }).required()
});



export default AddressSchema;