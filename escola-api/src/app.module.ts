import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module.js';
import { MongooseModule } from '@nestjs/mongoose';

try {
  process.loadEnvFile();
} catch {
}

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017',
      { dbName: process.env.MONGODB_DB_NAME ?? 'escola_db' },
    ),
    AlunosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
