import { Controller, Get, Param, BadRequestException, NotFoundException, Logger } from "@nestjs/common";
import { ProdutosService } from "./produtos.service.js";

@Controller('produtos')
export class ProdutosController {
    private readonly logger = new Logger(ProdutosController.name);
    constructor(private readonly produtosService: ProdutosService){}

    produtos(){
        return this.produtosService.listarProdutos()
    }

    @Get(':id')
    idProduto(@Param('id') idProduto : string){
        
        const id = Number(idProduto);

        if(isNaN(id)){
            this.logger.warn(`Tentativa de busca com ID não numérico`);
            throw new BadRequestException("ID inválido. Precisa ser numérico");
        }

        const produto = this.produtos().find(p => p.id === id);
        if(!produto){
            this.logger.warn(`Produto com id ${id} não encontrado`);
            throw new NotFoundException(`Produto com id ${id} não localizado`);
        }

        return produto;

    }

}