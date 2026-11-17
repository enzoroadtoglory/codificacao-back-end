import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RenomearCursoDto {
  @ApiProperty({
    example: 'Curso de Administração',
    description: 'Nome atual do curso (filtro do updateMany)',
  })
  @IsString()
  @IsNotEmpty()
  cursoAtual: string;

  @ApiProperty({
    example: 'Curso de Gestão',
    description: 'Novo nome do curso, aplicado a todos os alunos que o possuem',
  })
  @IsString()
  @IsNotEmpty()
  cursoNovo: string;
}
