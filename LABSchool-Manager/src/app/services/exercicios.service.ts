import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercicio, TipoUsuario } from '../exercicios/model/exercicios.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciciosService {

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

  createExercicio(exercicio: Exercicio): Observable<Exercicio> {
    return this.http.post<Exercicio>(`${this.apiUrl}/exercicio`, exercicio);
  }

  // Read
  getExercicio(id: number): Observable<Exercicio> {
    return this.http.get<Exercicio>(`${this.apiUrl}/exercicio/${id}`);
  }

  getExercicios(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${this.apiUrl}/exercicio`);
  }

  updateExercicio(id: number, exercicio: Exercicio): Observable<Exercicio> {
    return this.http.put<Exercicio>(`${this.apiUrl}/exercicio/${id}`, exercicio);
  }

  deleteExercicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/exercicio/${id}`);
  }
}

