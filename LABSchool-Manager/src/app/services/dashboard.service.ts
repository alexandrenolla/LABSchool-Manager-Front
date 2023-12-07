import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Atendimento, TipoUsuario } from '../Atendimentos/model/atendimento.moel';
import { User } from '../usuarios/Model/user.model';
import { Avaliacao } from '../Avaliacoes/model/avaliacoes.model';
import { Exercicio } from '../exercicios/model/exercicios.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://labschoolmanagerback.azurewebsites.net/api';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuario`);
}

  getTotalExercicios(): Observable<number> {
    return this.http.get<Exercicio[]>(`${this.apiUrl}/exercicio`).pipe(
      map(exercicios => exercicios.length)
    );
  }

  getTotalAvaliacoes(): Observable<number> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/avaliacao`).pipe(
      map(avaliacoes => avaliacoes.length)
    );
  }

  // Supondo que atendimentos tenham uma estrutura similar
  getTotalAtendimentos(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/atendimentos`).pipe(
      map(atendimentos => atendimentos.length)
    );
  }
  getAtendimentos(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.apiUrl}/atendimentos`);
  }

  getAlunos(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuario`).pipe(
      map(users => users.filter(user => user.tipoUsuario === TipoUsuario.Aluno))
    );
  }
}
