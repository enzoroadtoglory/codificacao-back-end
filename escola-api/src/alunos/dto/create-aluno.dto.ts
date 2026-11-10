import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateAlunoDto {
  @ApiProperty({
    example:'João Lucas Souza',
    description:'Nome completo do aluno'
  })
  @IsString()
  @IsNotEmpty({
    message: 'O nome é obrigatório e não pode ser vazio',
  })
  nome: string;

  @ApiProperty({
    example:'19',
    description:'Idade do aluno'
  })
  @IsInt()
  @Min(0, {
    message: 'A idade nao pode ser negativa',
  })
  idade: number;

  @ApiProperty({
    example:'0000',
    description:'Matricula do aluno na instituição'
  })
  @IsString()
  @IsNotEmpty({
    message: 'A matricula é obrigatória e não pode ser vazia',
  })
  matricula: string;

  @ApiProperty({
    example:["Curso de Administração", "Curso de Ciência da Computação"],
    description:'Lista do cursos em que o aluno está matriculado'
  })
  @IsArray()
  @IsString({
    each: true,
    message: 'O aluno deve estar matriculado em pelo menos um curso',
  })
  cursos: string[];
}
