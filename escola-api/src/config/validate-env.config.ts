import joi from "joi";

export function ValidateEnv<T>(config: Record<string, any>, schema: joi.ObjectSchema<T>){
    const {error, value} = schema.validate(config, {
        allowUnknown: true,
        abortEarly: false,
    });

    if(error){
        throw new Error(`[Config Validation Error]: ${error.message}`);
    }

    return value; 

}