import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class IncrementarIdadeDto {
  @ApiProperty({
    example: 1,
    description: 'Valor somado à idade com $inc. Use um valor negativo para subtrair.',
  })
  @IsInt()
  incremento: number;
}
