import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/escola_db'),
    AlunosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
