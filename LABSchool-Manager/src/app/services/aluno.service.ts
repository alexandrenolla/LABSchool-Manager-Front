import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TipoUsuario, User } from '../usuarios/Model/user.model';
import { Atendimento } from '../Atendimentos/model/atendimento.moel';
import { Avaliacao } from '../Avaliacoes/model/avaliacoes.model';
import { Exercicio } from '../exercicios/model/exercicios.model';
import { Endereco } from '../usuarios/components/details/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private apiUrl = 'https://labschoolmanagerback.azurewebsites.net/api';

  constructor(private http: HttpClient) { }

  // Alunos
  getAlunos(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuario`).pipe(
      map(users => {
        console.log("Usuarios recuperados:", users);
        const filteredUsers = users.filter(user => user.tipoUsuario === TipoUsuario.Aluno);
        console.log("Usuarios filtrados como alunos:", filteredUsers);
        return filteredUsers;
      })
    );
  }

  getAlunoById(id: number): Observable<User | null> {
    const url = `${this.apiUrl}/usuario/${id}`;
    return this.http.get<User>(url).pipe(
      catchError((error) => {
        console.error('Erro ao buscar o aluno', error);
        return of(null); // Retorna um observable vazio se ocorrer um erro
      })
    );
  }

  

  getAlunoId(alunoId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${alunoId}`);
  }

 
getAtendimentosByAlunoId(id: number): Observable<Atendimento[]> {
  const url = `${this.apiUrl}/atendimentos`;
  console.log(`Fetching all atendimentos from URL: ${url}`);
  return this.http.get<Atendimento[]>(url).pipe(
    map(atendimentos => {
      const filteredAtendimentos = atendimentos.filter(atendimento => atendimento.alunoId === id);
      console.log(`Atendimentos filtered for alunoId ${id}:`, filteredAtendimentos);
      return filteredAtendimentos;
    })
  );
}



  // Avaliações
// Avaliações
getAvaliacoesByAlunoId(id: number): Observable<Avaliacao[]> {
  const url = `${this.apiUrl}/avaliacao`;
  console.log(`Fetching all avaliacoes from URL: ${url}`);
  return this.http.get<Avaliacao[]>(url).pipe(
    map(avaliacoes => {
      const filteredAvaliacoes = avaliacoes.filter(avaliacao => avaliacao.alunoId === id);
      console.log(`Avaliações filtered for alunoId ${id}:`, filteredAvaliacoes);
      return filteredAvaliacoes;
    })
  );
}

// Exercícios
  getExerciciosByAlunoId(id: number): Observable<Exercicio[]> {
    const url = `${this.apiUrl}/exercicio`;
    console.log(`Fetching all exercicios from URL: ${url}`);
    return this.http.get<Exercicio[]>(url).pipe(
      map(exercicios => {
        const filteredExercicios = exercicios.filter(exercicio => exercicio.alunoId === id);
        console.log(`Exercícios filtered for alunoId ${id}:`, filteredExercicios);
        return filteredExercicios;
      })
    );
  }

  getEnderecoByAlunoId(id: number): Observable<Endereco[]> {
    const url = `${this.apiUrl}/endereco?usuarioId=${id}`;
    console.log(`Fetching endereco by usuarioId ${id} from URL: ${url}`);
    return this.http.get<Endereco[]>(url).pipe(
      map(enderecos => {
        console.log(`Endereços for usuarioId ${id}:`, enderecos);
        return enderecos;
      })
    );


  }
}
