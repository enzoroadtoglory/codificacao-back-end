import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutosService{
    produtos =[
        {id:1, nome:'Teclado mecaninco', preco:120.90},
        {id:2, nome:'Mouse Gamer', preco:99.99},
        {id:3, nome:'Monitor 144hz', preco:780.76},
        {id:4, nome:"Cadeira Gamer", preco:499.99}
    ];

    listarProdutos(){
        return this.produtos;
    }
}