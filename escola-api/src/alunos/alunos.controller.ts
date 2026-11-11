import { Controller, 
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete,
         Query,
         DefaultValuePipe,
         ParseIntPipe } from "@nestjs/common";
import { AlunosService } from "./alunos.service.js";
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { ApiTags, 
         ApiOperation, 
         ApiResponse,
         ApiQuery } from '@nestjs/swagger';

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
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Número da página(padrão: 1)'
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Itens por página(padrão: 10)'
    })
    findAllPage(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number){
        return this.alunoService.findAllPage(page, limit);
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