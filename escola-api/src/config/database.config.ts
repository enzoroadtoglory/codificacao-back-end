import {registerAs} from "@nestjs/config";
import joi from "joi";
import { ValidateEnv } from "./validate-env.config.js";

export default registerAs('database', () => {
    // uri:process.env.MONGODB_URI || 'mongodb://localhost:27017/escola_db',
    // maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || '10', 10) 
    const schema = joi.object({
        MONGODB_URI: joi.string().uri().required(),
        MONGO_MAX_POOL_SIZE: joi.number().default(10)
    });

    const env = ValidateEnv(process.env, schema);

    return {
        uri: env.MONGODB_URI,
        maxPoolSize: env.MONGO_MAX_POOL_SIZE,
    }

});