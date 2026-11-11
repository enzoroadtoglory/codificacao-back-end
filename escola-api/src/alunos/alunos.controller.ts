import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlunosService } from './alunos.service.js';
import { CreateAlunoDto } from './dto/create-aluno.dto.js';
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';
import { ApiTags,
        ApiOperation,
        ApiResponse, 
        ApiQuery} from '@nestjs/swagger';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  @ApiOperation({summary:"Cria a matrícula do aluno"})
  @ApiResponse({status: 201, description:"Matricula do aluno criada com sucesso"})
  @ApiResponse({status: 400, description:"Dados inválidos fornecidos na matrícula do aluno."})
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunosService.create(createAlunoDto);
  }

  @Get()
  @ApiOperation({summary:"Retorna os alunos presentes no sistema"})
  @ApiResponse({status: 404, description:"Nenhum aluno encontradi"})
  @ApiResponse({status: 500, description:"Problema interno do sistema."})

  @ApiQuery({
    name:'page',
    required:false,
    type:Number,
    description:'Número da página (Padrão:1)'
  })

  @ApiQuery({
    name:'limit',
    required:false,
    type:Number,
    description:'Itens por página (Padrão: 10)'
  })



  findAllPage() {
    return this.alunosService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:"Retorna um aluno especifico baseado no id"})
  @ApiResponse({status: 404, description:"Aluno não encontrado"})
  @ApiResponse({status: 500, description:"Problema interno do sistema."})
  findOne(@Param('id') id: string) {
    return this.alunosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:"Atualiza os dados de um aluno"})
  @ApiResponse({status: 404, description:"Aluno não encontrado"})
  @ApiResponse({status: 500, description:"Problema interno do sistema."})
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunosService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  @ApiOperation({summary:"Deleta um usuario do sistema a partir do id"})
  @ApiResponse({status: 200, description:"Aluno deletado com sucesso"})
  @ApiResponse({status: 404, description:"Aluno não encontrado"})
  @ApiResponse({status: 500, description:"Problema interno do sistema."})
  remove(@Param('id') id: string) {
    return this.alunosService.remove(id);
  }
}
