const joi = require("@hapi/joi");
const schema={
    user:joi.object(
        {
            firstName:joi.string().max(100).required(),
            lastName:joi.string().max(100).required(),
            gender:joi.string().valid("m","f","o").required(),
            email:joi.string().required(),
            password:joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{3,30}$")).required(),
            number:joi.number().integer().min(10000000000).message("Inavlid Mobile Number").max(100000000000000),

        }
    )
};
module.exports=schema;