import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryRelatorioDto {
  @ApiPropertyOptional({
    description: 'Considera apenas alunos matriculados neste curso ($match)',
  })
  @IsOptional()
  @IsString()
  curso?: string;
}
