import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlunosService } from './alunos.service.js';
import { QueryRelatorioDto } from './dto/query-relatorio.dto.js';

@ApiTags('alunos')
@Controller('alunos/relatorios')
export class AlunosRelatoriosController {
  constructor(private readonly alunoService: AlunosService) {}

  @Get('resumo')
  @ApiOperation({
    summary: 'Resumo geral dos alunos ($group com _id: null)',
  })
  @ApiResponse({
    status: 200,
    description: 'Total de alunos e média/menor/maior idade.',
  })
  resumo() {
    return this.alunoService.resumoGeral();
  }

  @Get('alunos-por-curso')
  @ApiOperation({
    summary: 'Quantidade de alunos e média de idade por curso ($unwind + $group + $project)',
  })
  @ApiResponse({
    status: 200,
    description: 'Um item por curso, ordenado por total de alunos.',
  })
  alunosPorCurso() {
    return this.alunoService.alunosPorCurso();
  }

  @Get('medias-por-disciplina')
  @ApiOperation({
    summary: 'Total, média, menor e maior nota por disciplina ($match + $unwind + $group + $project)',
  })
  @ApiResponse({
    status: 200,
    description: 'Um item por disciplina, ordenado pela média das notas.',
  })
  mediasPorDisciplina(@Query() query: QueryRelatorioDto) {
    return this.alunoService.mediasPorDisciplina(query.curso);
  }
}
