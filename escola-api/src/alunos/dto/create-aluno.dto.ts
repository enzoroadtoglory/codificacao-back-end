import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class NotaDto {
  @ApiProperty({ example: 'Banco de Dados', description: 'Disciplina' })
  @IsString()
  @IsNotEmpty()
  disciplina: string;

  @ApiProperty({ example: 8.5, description: 'Nota obtida' })
  @IsNumber()
  @Min(0)
  valor: number;
}

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

  @ApiPropertyOptional({
    example: '(41) 99999-0000',
    description: 'Telefone do aluno (opcional)',
  })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({
    type: [NotaDto],
    description: 'Notas do aluno por disciplina (opcional)',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotaDto)
  notas?: NotaDto[];
}
