import { Controller, Get, Headers, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('secreto')
export class SecurityController {
    @Get()
    acessarAreaSecreta(@Headers('x-api-key') apiKey: string, @Res() res: Response) {
        if(apiKey === 'enzolindo123'){
            res.setHeader('x-auth-status', 'Verificado');

            return res.status(200).json({
                mensagem:"Acesso ao conteudo ultra secreto",
                timestamp:new Date()
            });
        }
        return res.status(403).json({
            erro:'Forbidden',
            mensagem:'Chave de API invalida ou ausente',
        });
    }
}
