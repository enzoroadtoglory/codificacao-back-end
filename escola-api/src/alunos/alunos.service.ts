import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, QueryFilter } from "mongoose";
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { QueryAlunosDto } from "./dto/query-alunos.dto.js";
import { IncrementarIdadeDto } from "./dto/incrementar-idade.dto.js";
import { RenomearCursoDto } from "./dto/renomear-curso.dto.js";
import { ExcluirLoteQueryDto } from "./dto/excluir-lote-query.dto.js";
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
            returnDocument: 'after',
            runValidators: true,
        }).exec();

        if(!alunoAtualizado){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return alunoAtualizado;
    } //!PATCH

    async incrementarIdade(id: string, dto: IncrementarIdadeDto){
        const resultado = await this.alunoModel.updateOne(
            { _id: id },
            { $inc: { idade: dto.incremento } },
            { runValidators: true },
        ).exec();

        if(resultado.matchedCount === 0){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return {
            matchedCount: resultado.matchedCount,
            modifiedCount: resultado.modifiedCount,
        };
    }

    async renomearCurso(dto: RenomearCursoDto){
        const resultado = await this.alunoModel.updateMany(
            { cursos: dto.cursoAtual },
            { $set: { 'cursos.$[c]': dto.cursoNovo } },
            { arrayFilters: [{ c: dto.cursoAtual }] },
        ).exec();

        return {
            matchedCount: resultado.matchedCount,
            modifiedCount: resultado.modifiedCount,
        };
    }

    async excluirEmLote(query: ExcluirLoteQueryDto){
        const filtro: QueryFilter<Aluno> = { cursos: query.curso };

        if(query.simular){
            const encontrados = await this.alunoModel.countDocuments(filtro).exec();
            return { simulacao: true, encontrados };
        }

        const resultado = await this.alunoModel.deleteMany(filtro).exec();
        return { simulacao: false, deletedCount: resultado.deletedCount };
    }

    async alunosPorCurso(){
        return this.alunoModel.aggregate([
            { $unwind: '$cursos' },
            { $group: {
                _id: '$cursos',
                totalAlunos: { $sum: 1 },
                mediaIdade: { $avg: '$idade' },
            } },
            { $project: {
                _id: 0,
                curso: '$_id',
                totalAlunos: 1,
                mediaIdade: { $round: ['$mediaIdade', 1] },
            } },
            { $sort: { totalAlunos: -1, curso: 1 } },
        ]).exec();
    }

    async mediasPorDisciplina(curso?: string){
        const pipeline: PipelineStage[] = [];

        if(curso){
            pipeline.push({ $match: { cursos: curso } });
        }

        pipeline.push(
            { $unwind: '$notas' },
            { $group: {
                _id: '$notas.disciplina',
                totalPontos: { $sum: '$notas.valor' },
                mediaNotas: { $avg: '$notas.valor' },
                menorNota: { $min: '$notas.valor' },
                maiorNota: { $max: '$notas.valor' },
                quantidadeNotas: { $sum: 1 },
            } },
            { $project: {
                _id: 0,
                disciplina: '$_id',
                totalPontos: 1,
                mediaNotas: { $round: ['$mediaNotas', 2] },
                menorNota: 1,
                maiorNota: 1,
                quantidadeNotas: 1,
            } },
            { $sort: { mediaNotas: -1, disciplina: 1 } },
        );

        return this.alunoModel.aggregate(pipeline).exec();
    }

    async resumoGeral(){
        const [resumo] = await this.alunoModel.aggregate([
            { $group: {
                _id: null,
                totalAlunos: { $sum: 1 },
                mediaIdade: { $avg: '$idade' },
                menorIdade: { $min: '$idade' },
                maiorIdade: { $max: '$idade' },
            } },
            { $project: {
                _id: 0,
                totalAlunos: 1,
                mediaIdade: { $round: ['$mediaIdade', 1] },
                menorIdade: 1,
                maiorIdade: 1,
            } },
        ]).exec();

        return resumo ?? { totalAlunos: 0, mediaIdade: null, menorIdade: null, maiorIdade: null };
    }

    async remove(id: string): Promise<Aluno>{
        const alunoRemovido = await this.alunoModel.findByIdAndDelete(id).exec();
        
        if(!alunoRemovido){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return alunoRemovido;
    
    } //!DELETE
    //!CRUD
}
