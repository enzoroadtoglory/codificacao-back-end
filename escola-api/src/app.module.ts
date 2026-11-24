import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from './config/database.config.js';
import authConfig from './config/auth.config.js';
import joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[databaseConfig, authConfig],
      // validationSchema: joi.object({
      //   NODE_ENV:joi
      //     .string()
      //     .valid('desenvolvimento', 'producao', 'teste')
      //     .default('desenvolvimento'),
      //   PORT:joi.number().default(3000),
      //   MONGODB_URI: joi.string().required(),
      //   JWT_SECRET: joi.string().required()
      // }),
    }),
    MongooseModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (dbconfig: ConfigType<typeof databaseConfig>) => ({
        uri: dbconfig.uri,
        maxPoolSize: dbconfig.maxPoolSize
      })
    }),
    AlunosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
