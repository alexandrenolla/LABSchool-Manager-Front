export enum TipoGenero {
  Masculino = 0,
  Feminino = 1,
}

export enum TipoUsuario {
  Administrador = 0,
  Pedagogo = 1,
  Professor = 2,
  Aluno = 3
}

export enum TipoEstado {
  AC = 0,
  AL = 1,
  AP = 2,
  AM = 3,
  BA = 4,
  CE = 5,
  DF = 6,
  ES = 7,
  GO = 8,
  MA = 9,
  MT = 10,
  MS = 11,
  MG = 12,
  PA = 13,
  PB = 14,
  PR = 15,
  PE = 16,
  PI = 17,
  RJ = 18,
  RN = 19,
  RS = 20,
  RO = 21,
  RR = 22,
  SC = 23,
  SP = 24,
  SE = 25,
  TO = 26
}

export interface User {
  id?: number;
  nome: string;
  genero: TipoGenero;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  tipoUsuario: TipoUsuario;
  endereco: {
      cep: string;
      cidade: string;
      estado: TipoEstado;
      logradouro: string;
      numero: string;
      complemento?: string;
      bairro: string;
      referencia?: string;
  };
  statusAtivo: boolean;
  matricula?: number | null;
  codigoProfessor?: number;
  whiteLabelId?: number;
}

export interface UserForBackend extends Omit<User, 'genero' | 'tipoUsuario' | 'endereco'> {
  genero: TipoGenero;
  tipoUsuario: TipoUsuario;
  endereco: {
      cep: string;
      cidade: string;
      estado: TipoEstado;
      logradouro: string;
      numero: string;
      complemento?: string;
      bairro: string;
      referencia?: string;
  };
}