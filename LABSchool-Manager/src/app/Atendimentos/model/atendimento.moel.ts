export interface Atendimento {
    id?: number;
    dataHora: string;
    descricao: string;
    statusAtivo: boolean;
    alunoId: number;
    pedagogoId: number;
  }
  export enum TipoUsuario {
    Administrador = 0,
    Pedagogo = 1,
    Professor = 2,
    Aluno = 3
}
