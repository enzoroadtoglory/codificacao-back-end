import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

// "a,b,c" -> ['a','b','c']
const toStringList = ({ value }: { value: unknown }) =>
  typeof value === 'string'
    ? value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : value;

// "18,20" -> [18, 20] (valores inválidos viram NaN e falham na validação)
const toNumberList = ({ value }: { value: unknown }) =>
  typeof value === 'string'
    ? value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map(Number)
    : value;

const toBoolean = ({ value }: { value: unknown }) =>
  value === 'true' ? true : value === 'false' ? false : value;

export class QueryAlunosDto {
  @ApiPropertyOptional({ default: 1, description: 'Número da página (padrão: 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ default: 10, description: 'Itens por página (padrão: 10, máx.: 100)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  // ---- Filtros já existentes ----

  @ApiPropertyOptional({ description: 'Filtra alunos cujo nome contém o texto ($regex, sem distinção de maiúsculas)' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ description: 'Filtra alunos matriculados exatamente neste curso' })
  @IsOptional()
  @IsString()
  curso?: string;

  // ---- Operadores avançados (aula 06) ----

  @ApiPropertyOptional({ description: '$regex: nome que COMEÇA com o texto (ex.: Ana)' })
  @IsOptional()
  @IsString()
  nomeComecaCom?: string;

  @ApiPropertyOptional({
    type: String,
    description: '$in: alunos em QUALQUER um dos cursos, separados por vírgula',
    example: 'Administração,Ciência da Computação',
  })
  @IsOptional()
  @Transform(toStringList)
  @IsString({ each: true })
  cursosIn?: string[];

  @ApiPropertyOptional({
    type: String,
    description: '$nin: alunos que NÃO estão em nenhum dos cursos, separados por vírgula',
    example: 'Administração',
  })
  @IsOptional()
  @Transform(toStringList)
  @IsString({ each: true })
  cursosNin?: string[];

  @ApiPropertyOptional({
    type: String,
    description: '$in: matrículas desejadas, separadas por vírgula',
    example: '1001,1002',
  })
  @IsOptional()
  @Transform(toStringList)
  @IsString({ each: true })
  matriculasIn?: string[];

  @ApiPropertyOptional({
    type: String,
    description: '$nin: exclui as idades informadas, separadas por vírgula (inclui alunos sem idade)',
    example: '18,20',
  })
  @IsOptional()
  @Transform(toNumberList)
  @IsInt({ each: true })
  idadesNin?: number[];

  @ApiPropertyOptional({
    type: Boolean,
    description: '$exists: true = só quem tem telefone; false = só quem não tem',
  })
  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  comTelefone?: boolean;

  @ApiPropertyOptional({
    description: '$elemMatch: disciplina da nota (use junto com notaMinima)',
    example: 'Banco de Dados',
  })
  @IsOptional()
  @IsString()
  disciplina?: string;

  @ApiPropertyOptional({
    description: '$elemMatch: nota estritamente maior que este valor, na mesma disciplina',
    example: 7,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  notaMinima?: number;
}
