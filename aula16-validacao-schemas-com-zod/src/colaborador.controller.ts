import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { colaboradorSchema } from "./colaborador.schemas.js";
import { ZodValidationPipe } from "./zod-validation.pipe.js";

@Controller('colaboradores')
export class ColaboradoresController{
    @Post()
    @UsePipes(new ZodValidationPipe(colaboradorSchema))
    async create(){
        
    }
}