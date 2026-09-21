import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Get, Query, Put} from '@nestjs/common';
import type { Convidado } from '../../type/Convidado.js';
import { ConvidadosService } from '../../services/convidados/convidados.service.js';

@Controller('convidados')
export class ConvidadosController {
    constructor(private convidadoService: ConvidadosService) {}

    @Get()
    listarConvidados(){
        return this.convidadoService.retornarAlunos();
    }

    @Get('filtrar')
    filtrarIdade(@Query('idade', ParseIntPipe) idade:number){
        return this.convidadoService.retornarAlunosIdade(idade);
    }

    @Post()
    async criar(@Body() convidado:Convidado){
        const response = this.convidadoService.criar(convidado);

        return {
            mensagem: `Usuário ${convidado.nome} cadastrado com sucesso`,
            dados: convidado
        } 
    }

    @Patch(':id')
    atualizarIdade(@Param('id', ParseIntPipe) id:number, @Body('idade') idade:number){
        console.log(`[ADM]: Atualizando a idade do ID ${id}`);
        return this.convidadoService.atualizarIdade(id, idade);
    }

    @Put(':id')
    substituirConvidado(@Param('id', ParseIntPipe) id : number, @Body() substituto: Convidado){
        console.log(`[ADM]: Substituindo informações do ${id}`);
        this.convidadoService.substituirConvidado(id, substituto);
    }

    @Delete(':id')
    deletarConvidado(@Param('id', ParseIntPipe) id : number, @Body() substituto: Convidado){
        console.log(`[ADM]: Substituindo informações do ${id}`);
        this.convidadoService.deletarUsuario(id);
    }

}
