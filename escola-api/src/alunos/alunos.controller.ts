import { Controller, 
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete,
         Query } from "@nestjs/common";
import { AlunosService } from "./alunos.service.js";
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { QueryAlunosDto } from "./dto/query-alunos.dto.js";
import { IncrementarIdadeDto } from "./dto/incrementar-idade.dto.js";
import { RenomearCursoDto } from "./dto/renomear-curso.dto.js";
import { ExcluirLoteQueryDto } from "./dto/excluir-lote-query.dto.js";
import { ApiTags,
         ApiOperation,
         ApiResponse } from '@nestjs/swagger';

@ApiTags('alunos')         
@Controller('alunos')
export class AlunosController {
    constructor(private readonly alunoService : AlunosService){}
    
    @Post()
    @ApiOperation({
        summary: 'Cria a matrícula do aluno',
    })
    @ApiResponse({
        status: 201,
        description: 'A matrícula do aluno foi criada com sucesso.',
    })
    @ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos ou mal formatados.',
    })

    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor, matricula duplicada ou serviço indisponível.',
    })

    create(@Body() createAlunoDto:CreateAlunoDto){
        return this.alunoService.create(createAlunoDto);
    }
    @Get()
    @ApiOperation({
        summary: 'Retorna a lista de alunos cadastrados',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de alunos retornada com sucesso.',
    })
    @ApiResponse({
        status: 404,
        description: 'Nenhum aluno encontrado.',
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor ou serviço indisponível.',
    })
    // findAll(){
    //     return this.alunoService.findAll();
    // }
    @Get()
    @ApiOperation({
        summary: 'Retorna a lista de alunos cadastrados com paginação',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de alunos retornada com sucesso.',
    })
    @ApiResponse({
        status: 404,
        description: 'Nenhum aluno encontrado.',
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor ou serviço indisponível.',
    })
    // Os parâmetros (page, limit, nome, curso e os operadores avançados
    // $in/$nin/$exists/$regex/$elemMatch) são documentados em QueryAlunosDto.
    findAllPage(@Query() query: QueryAlunosDto){
        return this.alunoService.findAllPage(query);
    }
    @Get(':id')
    @ApiOperation({
        summary: 'Retorna um aluno específico pelo _id',
    })
    @ApiResponse({
        status: 200,
        description: 'Aluno retornado com sucesso.',
    })
    @ApiResponse({
        status: 404,
        description: 'Aluno não encontrado pelo _id.',
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor ou serviço indisponível.',
    })
    findOne(@Param('id') id: string){
        return this.alunoService.findOne(id);
    }
    @Patch(':id')
    @ApiOperation({
        summary: 'Atualiza os dados de um aluno específico pelo _id',
    })
    @ApiResponse({
        status: 200,
        description: 'Aluno atualizado com sucesso.',
    })
    @ApiResponse({
        status: 404,
        description: 'Aluno não encontrado pelo _id.',
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor ou serviço indisponível.',
    })
    update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto){
        return this.alunoService.update(id, updateAlunoDto);
    }
    @Patch(':id/incrementar-idade')
    @ApiOperation({
        summary: 'Incrementa (ou decrementa) a idade de um aluno com $inc',
    })
    @ApiResponse({
        status: 200,
        description: 'Idade atualizada. Retorna matchedCount e modifiedCount.',
    })
    @ApiResponse({
        status: 404,
        description: 'Aluno não encontrado pelo _id.',
    })
    incrementarIdade(@Param('id') id: string, @Body() dto: IncrementarIdadeDto){
        return this.alunoService.incrementarIdade(id, dto);
    }

    @Patch('lote/renomear-curso')
    @ApiOperation({
        summary: 'Renomeia um curso para todos os alunos que o possuem (updateMany)',
    })
    @ApiResponse({
        status: 200,
        description: 'Retorna matchedCount e modifiedCount.',
    })
    @ApiResponse({
        status: 400,
        description: 'Dados inválidos.',
    })
    renomearCurso(@Body() dto: RenomearCursoDto){
        return this.alunoService.renomearCurso(dto);
    }

    @Delete('lote')
    @ApiOperation({
        summary: 'Exclui os alunos de um curso (deleteMany com filtro obrigatório)',
    })
    @ApiResponse({
        status: 200,
        description: 'Retorna deletedCount, ou apenas a contagem se simular=true.',
    })
    @ApiResponse({
        status: 400,
        description: 'Curso não informado: a exclusão sem filtro é bloqueada.',
    })
    excluirEmLote(@Query() query: ExcluirLoteQueryDto){
        return this.alunoService.excluirEmLote(query);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Remove um aluno específico pelo _id',
    })
    @ApiResponse({
        status: 200,
        description: 'Aluno removido com sucesso.',
    })
    @ApiResponse({
        status: 404,
        description: 'Aluno não encontrado pelo _id.',
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor ou serviço indisponível.',
    })
    remove(@Param('id') id: string){
        return this.alunoService.remove(id);
    }
}