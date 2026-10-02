import { Controller, Get, NotFoundException, Req } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
 @Get()
 getPublic(){
  return{
    message:'Rota pública acessada com sucesso',
    date:new Date()
  }
 }

 @Get('admin')
 getAdmin(@Req() req:any){
  return {
    message:'Bem-vindo ao painel administrativo',
    date:new Date()
  }
 }

 @Get('secret')
 getSecret(){
  return{
    mensagem:"Bem-vindo à rota secret!",
    data:new Date()
  }
 }

}
