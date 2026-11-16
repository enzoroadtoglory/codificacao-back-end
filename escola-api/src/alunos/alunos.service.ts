import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model,QueryFilter } from "mongoose";
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { QueryAlunosDto } from "./dto/query-alunos.dto.js";
import { Aluno,AlunoDocument } from "./schemas/aluno.schema.js";

// Escapa caracteres especiais de regex para tratar o texto do usuário como literal.
const escapeRegex = (texto: string) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

@Injectable()
export class AlunosService {
    constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>){}

    async create(createAlunoDto: CreateAlunoDto):Promise<Aluno>{
        const createdAluno = new this.alunoModel(createAlunoDto);
        return createdAluno.save(); //!POST
    }

    async findAllPage(query: QueryAlunosDto){
        const { page, limit } = query;
        const skip = (page - 1) * limit;

        // Cada filtro vira uma condição; todas são combinadas com $and
        // (assim "curso" e "cursosIn" podem coexistir sem sobrescrever a mesma chave).
        const condicoes: QueryFilter<Aluno>[] = [];

        // $regex: contém o texto (escapado para não interpretar o input como regex)
        if(query.nome){
          condicoes.push({ nome: { $regex: escapeRegex(query.nome), $options: 'i' } });
        }

        // $regex: começa com o texto
        if(query.nomeComecaCom){
          condicoes.push({ nome: { $regex: `^${escapeRegex(query.nomeComecaCom)}`, $options: 'i' } });
        }

        if(query.curso){
          condicoes.push({ cursos: query.curso });
        }

        // $in: qualquer um dos cursos / matrículas
        if(query.cursosIn?.length){
          condicoes.push({ cursos: { $in: query.cursosIn } });
        }
        if(query.matriculasIn?.length){
          condicoes.push({ matricula: { $in: query.matriculasIn } });
        }

        // $nin: nenhum dos cursos / idades (também retorna docs sem o campo)
        if(query.cursosNin?.length){
          condicoes.push({ cursos: { $nin: query.cursosNin } });
        }
        if(query.idadesNin?.length){
          condicoes.push({ idade: { $nin: query.idadesNin } });
        }

        // $exists: com ou sem telefone cadastrado
        if(query.comTelefone !== undefined){
          condicoes.push({ telefone: { $exists: query.comTelefone } });
        }

        // $elemMatch: disciplina E nota no MESMO elemento do array "notas"
        if(query.disciplina || query.notaMinima !== undefined){
          const item: Record<string, unknown> = {};
          if(query.disciplina){
            item.disciplina = query.disciplina;
          }
          if(query.notaMinima !== undefined){
            item.valor = { $gt: query.notaMinima };
          }
          condicoes.push({ notas: { $elemMatch: item } });
        }

        const filtro: QueryFilter<Aluno> = condicoes.length ? { $and: condicoes } : {};

        const [data, total] = await Promise.all([
            this.alunoModel.find(filtro).skip(skip).limit(limit).exec(),
            this.alunoModel.countDocuments(filtro).exec()
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    } //!GET

    // async findAll(): Promise<Aluno[]> {
    //     return this.alunoModel.find().exec();
    // } //!GET

    async findOne(id:string):Promise< Aluno >{
        const aluno = await this.alunoModel.findById(id).exec();

        if(!aluno){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return aluno;
    }//!GET

    async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise <Aluno>{
        const alunoAtualizado = await this.alunoModel.findByIdAndUpdate(id,updateAlunoDto, {
            new: true
        }).exec();

        if(!alunoAtualizado){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return alunoAtualizado;
    } //!PATCH
    async remove(id: string): Promise<Aluno>{
        const alunoRemovido = await this.alunoModel.findByIdAndDelete(id).exec();
        
        if(!alunoRemovido){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return alunoRemovido;
    
    } //!DELETE
    //!CRUD
}
