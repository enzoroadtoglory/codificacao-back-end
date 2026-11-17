import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { toBoolean } from './query-alunos.dto.js';

export class ExcluirLoteQueryDto {
  @ApiProperty({ description: 'Exclui os alunos matriculados neste curso' })
  @IsString()
  @IsNotEmpty()
  curso: string;

  @ApiPropertyOptional({
    type: Boolean,
    default: false,
    description: 'true = não exclui nada, apenas conta quantos alunos seriam excluídos',
  })
  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  simular?: boolean;
}
