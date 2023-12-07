import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TipoUsuario } from '../usuarios/Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://labschoolmanagerback.azurewebsites.net/api/usuario';
  public currentUserSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;

  constructor(private http: HttpClient) {
    const currentUserString = localStorage.getItem('currentUser');
    const parsedUser = currentUserString ? JSON.parse(currentUserString) : null;
    
    // Log para verificar o tipoUsuario depois que o usuário estiver logado
    if (parsedUser) {
        console.log('Usuário logado com tipoUsuario:', parsedUser.tipoUsuario);
    }

    this.currentUserSubject = new BehaviorSubject<any | null>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
}


  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.API_URL}/login`, { Email: username, password })
      .pipe(
        map(response => {
          console.log('Resposta completa do servidor:', response); // Log para a resposta completa

          if (response && response.token) {
            console.log('Token recebido:', response.token); // Log para o token
        
            const user = {
              nome: response.nome, 
              token: response.token,
              tipoUsuario: response.tipoUsuario, // Ajuste aqui
            };
        
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return true;
        }
        
          return false;
        }),
        catchError((error) => {
          console.error('Erro ao tentar fazer login:', error);
          return throwError(error.message || 'Credenciais inválidas. Por favor, tente novamente.');
        })
      );
}


  isAdmin(): boolean {
    const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
    console.log('Valor de user.tipoUsuario:', user?.tipoUsuario);
    return user && user.tipoUsuario === TipoUsuario.Administrador;
  }

  getCurrentUserValue(): any {
    return this.currentUserSubject.value;
}


  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  resetPassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const requestBody = {
        email,
        currentPassword,
        newPassword
    };

    return this.http.put<string>(`${this.API_URL}/changepassword`, requestBody, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error) => {
          console.error('Erro ao tentar redefinir senha:', error);
          return throwError('Não foi possível redefinir a senha. Por favor, tente novamente.');
        })
      );
}


}
