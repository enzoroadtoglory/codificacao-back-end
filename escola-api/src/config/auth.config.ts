import {registerAs} from "@nestjs/config";
import joi from 'joi';
import { ValidateEnv } from "./validate-env.config.js";

export default registerAs('auth', () => {
    const schema = joi.object({
        JWT_SECRET: joi.string().min(32).max(64).required(),
        JWT_EXPIRES_IN: joi.string().default('1d'),
    });

    const env = ValidateEnv(process.env, schema);

    return {
        jwtSecret: env.JWT_SECRET,
        jwtExpiresIn: env.JWT_EXPIRES_IN
    };

})