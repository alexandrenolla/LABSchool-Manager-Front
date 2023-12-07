import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TipoUsuario } from 'src/app/usuarios/Model/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private router: Router, private authService: AuthService) { }
 
  isAluno(): boolean {
    const user = this.authService.getCurrentUserValue();
    return user && user.tipoUsuario === TipoUsuario.Aluno;
}

isAdministrador(): boolean {
  const user = this.authService.getCurrentUserValue();
  return user && user.tipoUsuario === TipoUsuario.Administrador;
}



  navigateTo(route: string) {
    this.router.navigate([route]);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}