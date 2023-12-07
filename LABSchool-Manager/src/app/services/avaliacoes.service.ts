import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avaliacao, TipoUsuario } from '../Avaliacoes/model/avaliacoes.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {

  private apiUrl: string = "https://labschoolmanagerback.azurewebsites.net/api";

  constructor(private http: HttpClient) { }

  // Método para obter alunos
  getAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario`).pipe(
      map(users => {
        const alunos = users.filter(user => user.tipoUsuario === TipoUsuario.Aluno);
        console.log("Alunos filtrados: ", alunos);
        return alunos;
      })
    );
  }

  // Método para obter professores
  getProfessores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario`).pipe(
      map(users => {
        const professores = users.filter(user => user.tipoUsuario === TipoUsuario.Professor);
        console.log("Professores filtrados: ", professores);
        return professores;
      })
    );
  }

  // Create
  createAvaliacao(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(`${this.apiUrl}/avaliacao`, avaliacao);
  }

  // Read
  getAvaliacao(id: number): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(`${this.apiUrl}/avaliacao/${id}`);
  }

  getAvaliacoes(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/avaliacao`);
  }

  // Update
  updateAvaliacao(id: number, avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.put<Avaliacao>(`${this.apiUrl}/avaliacao/${id}`, avaliacao);
  }

  // Delete
  deleteAvaliacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/avaliacao/${id}`);
  }
}
