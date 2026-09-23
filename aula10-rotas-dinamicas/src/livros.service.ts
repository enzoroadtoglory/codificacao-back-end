import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class LivrosService{

    private livros = [
        {id: 1, titulo: 'Senhor dos Anéis', autor: 'J.K.K Parker'},
        {id: 2, titulo: '1984', autor: 'George Orwell'},
        {id: 3, titulo: 'Dom Casmurro', autor: 'Machado de Assis'},
        {id: 4, titulo: 'Diário de um banana', autor: 'Jeff Kinney'},
        {id: 5, titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis'}
    ];

    acharTodos(){
        return this.livros;
    }

    acharPorId(id:number){
        const livro = this.livros.find((livro) => livro.id === id);
        if(!livro){
            throw new NotFoundException(`Livro com ID ${id} não encontrado`);
        } 
        return livro;
    }

}