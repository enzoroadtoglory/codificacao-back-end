import { Injectable, NotFoundException, Query } from '@nestjs/common';
import type { Convidado } from '../../type/Convidado.js';

@Injectable()
export class ConvidadosService {

    convidados: Convidado[] = [
        {id:1, nome: 'Emanoel', idade:19},
        {id:2, nome: 'Henry', idade:18},
        {id:3, nome: 'Isaac', idade:0},
    ];

    private findOne(id: number){
        const convidado = this.convidados.find((c) => c.id === id);

        if(!convidado){
            throw new NotFoundException("Convidado não encontrado");
        }

        return convidado;
    }

    // ======================== POST ========================

    // POST
    criar(convidado:Convidado){
        console.log("[LOG] Usuario recebido por requisição com sucesso!");
        this.convidados.push(convidado);
    }

    // ======================== GET ========================

    // GET
    retornarAlunos(){
        return this.convidados;
    }

    // GET FILTRO POR IDADE
    retornarAlunosIdade(idade:number){
        const convidadosFiltrados: Convidado[] = [];

        for (const convidado of this.convidados) {
            if (convidado.idade === idade) {
                convidadosFiltrados.push(convidado);
            }
        }

        return convidadosFiltrados;
    }

    // ======================== PATCH ========================

    //PATCH IDADE
    atualizarIdade(id: number, idade: number){
        const convidado = this.findOne(id);

        convidado.idade = idade;

        return convidado;
    }
    
    // ======================== PUT ========================

    //PUT
    substituirConvidado(id : number, convidado : Convidado){
        const achado = this.findOne(id);
        Object.assign(achado, convidado);
        return achado;
    }

    // ======================== DELETE ========================

    deletarUsuario(id: number){
        const index = this.convidados.findIndex((c) => c.id === id);
        if (index === -1) throw new NotFoundException("Convidado não encontrado");
        this.convidados.splice(index, 1);
    }

}
