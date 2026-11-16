import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlunoDocument = HydratedDocument<Aluno>;

// Sub-documento: permite consultar "array de objetos" com $elemMatch.
@Schema({ _id: false })
export class Nota {
  @Prop({ required: true })
  disciplina: string;

  @Prop({ required: true })
  valor: number;
}

export const NotaSchema = SchemaFactory.createForClass(Nota);

@Schema()
export class Aluno {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  idade: number;

  @Prop({ required: true, unique: true })
  matricula: string;

  @Prop([String])
  cursos: string[];

  // Opcional: alunos antigos não possuem o campo (útil para $exists).
  @Prop()
  telefone?: string;

  // Opcional: array de objetos, consultado com $elemMatch.
  @Prop({ type: [NotaSchema] })
  notas?: Nota[];
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);
