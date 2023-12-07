export interface Avaliacao {
    id?: number;
    titulo: string;
    descricao: string;
    materia: string;
    pontuacaoMaxima: number;
    nota: number;
    dataRealizacao: string;
    codigoProfessor: number;
    alunoId: number;
    
}

export enum TipoUsuario {
    Administrador = 0,
    Pedagogo = 1,
    Professor = 2,
    Aluno = 3
}