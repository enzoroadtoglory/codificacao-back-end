import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunosService } from './alunos.service.js';
import { AlunosController } from './alunos.controller.js';
import { AlunosRelatoriosController } from './alunos-relatorios.controller.js';
import { Aluno, AlunoSchema } from './schemas/aluno.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aluno.name, schema: AlunoSchema }]),
  ],
  controllers: [AlunosController, AlunosRelatoriosController],
  providers: [AlunosService],
})
export class AlunosModule {}
