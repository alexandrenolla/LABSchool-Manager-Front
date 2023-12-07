import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
 
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  showAlert() {
    alert('Por favor, entre em contato com um administrador do sistema para criar uma conta.');
}


  login(): void {
    console.log('Tentativa de login iniciada com', this.email); // Log 1

   
    this.authService.login(this.email, this.password).subscribe(
      (authenticated: boolean) => {
        console.log('Autenticado:', authenticated); // Log 2

       
        if (authenticated) {
          this.router.navigate(['/dashbord']);
        } else {
          this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
        }
      },
      (error: any) => {
        console.error('Erro ao tentar autenticar:', error); // Log 3
      
        this.errorMessage = error;
      }
    );
  }
}

