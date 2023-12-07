import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.resetPassword(this.email, this.currentPassword, this.newPassword)
      .subscribe(
        response => {
          this.message = response || "Senha redefinida com sucesso!";
          this.router.navigate(['/login']);
        },
        error => {
          this.message = error;
        }
      );
  }
}  