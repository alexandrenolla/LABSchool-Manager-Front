import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, TipoUsuario } from '../usuarios/Model/user.model'; // Corrigido o caminho do modelo de usuário
import { Atendimento } from '../Atendimentos/model/atendimento.moel';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private apiUrl = 'https://labschoolmanagerback.azurewebsites.net/api';

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuario`).pipe(
      map(users => users.filter(user => user.tipoUsuario === TipoUsuario.Aluno))
    );
  }
  
  getPedagogos(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuario`).pipe(
      map(users => users.filter(user => user.tipoUsuario === TipoUsuario.Pedagogo))
    );
  }
  

  // Create
  createAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.apiUrl}/atendimentos`, atendimento);
  }

  // Read
  getAtendimento(id: number): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.apiUrl}/atendimentos/${id}`);
  }

  getAtendimentos(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.apiUrl}/atendimentos`);
  }

  // Update
  updateAtendimento(id: number, atendimento: Atendimento): Observable<Atendimento> {
    return this.http.put<Atendimento>(`${this.apiUrl}/atendimentos/${id}`, atendimento);
  }

  // Delete
  deleteAtendimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/atendimentos/${id}`);
  }
}
