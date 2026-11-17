import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlunoDocument = HydratedDocument<Aluno>;

// Sub-documento: permite consultar "array de objetos" com $elemMatch.
@Schema({ _id: false })
export class Nota {
  @Prop({
    required: [true, 'A disciplina é obrigatória'],
    trim: true,
    minlength: [2, 'A disciplina deve ter no mínimo 2 caracteres'],
  })
  disciplina: string;

  @Prop({
    required: [true, 'O valor da nota é obrigatório'],
    min: [0, 'A nota não pode ser menor que 0'],
    max: [10, 'A nota não pode ser maior que 10'],
  })
  valor: number;
}

export const NotaSchema = SchemaFactory.createForClass(Nota);

@Schema()
export class Aluno {
  @Prop({
    required: [true, 'O nome é obrigatório'],
    trim: true,
    minlength: [2, 'O nome deve ter no mínimo 2 caracteres'],
    index: true,
  })
  nome: string;

  @Prop({
    required: [true, 'A idade é obrigatória'],
    min: [0, 'A idade não pode ser negativa'],
  })
  idade: number;

  @Prop({
    required: [true, 'A matrícula é obrigatória'],
    unique: true,
    trim: true,
  })
  matricula: string;

  @Prop({ type: [{ type: String, trim: true }], index: true })
  cursos: string[];

  // Opcional: alunos antigos não possuem o campo (útil para $exists).
  @Prop({
    trim: true,
    match: [/^[\d\s()+-]{8,20}$/, 'Telefone inválido'],
  })
  telefone?: string;

  // Opcional: array de objetos, consultado com $elemMatch.
  @Prop({ type: [NotaSchema] })
  notas?: Nota[];
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);
