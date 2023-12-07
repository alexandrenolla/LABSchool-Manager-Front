import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent as AtendimentoListComponent} from './Atendimentos/components/list/list.component';
import { CreateComponent as AtendimentoCreateComponent } from './Atendimentos/components/create/create.component';
import { EditComponent as AtendimentoEditComponent } from './Atendimentos/components/edit/edit.component';
import { ListComponent as AvaliacaoListComponent } from './Avaliacoes/components/list/list.component';
import { CreateComponent as AvaliacaoCreateComponent } from './Avaliacoes/components/create/create.component';
import { EditComponent as AvaliacaoEditComponent } from './Avaliacoes/components/edit/edit.component';
import { ListComponent as ExercicioListComponent } from './exercicios/components/list/list.component';
import { CreateComponent as ExercicioCreateComponent } from './exercicios/components/create/create.component';
import { EditComponent as ExercicioEditComponent } from './exercicios/components/edit/edit.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { ListComponent } from './usuarios/components/list/list.component';
import { DetailsComponent } from './usuarios/components/details/details.component';
import { WhiteLabelComponent } from './white-label/components/white-label/white-label.component';
import { LogsComponent } from './logs/components/logs/logs.component';
import { CreateEditComponent} from './usuarios/components/create-edit/create-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'atendimentos/list', component: AtendimentoListComponent, canActivate: [AuthGuard] },
  { path: 'atendimentos/create', component: AtendimentoCreateComponent, canActivate: [AuthGuard]},
  { path: 'atendimentos/edit/:id', component: AtendimentoEditComponent, canActivate: [AuthGuard] },
  { path: 'avaliacoes/list', component: AvaliacaoListComponent, canActivate: [AuthGuard] },
  { path: 'avaliacoes/create', component: AvaliacaoCreateComponent,canActivate: [AuthGuard] },
  { path: 'avaliacoes/edit/:id', component: AvaliacaoEditComponent, canActivate: [AuthGuard] },
  { path: 'exercicios/list', component: ExercicioListComponent, canActivate: [AuthGuard] },
  { path: 'exercicios/create', component: ExercicioCreateComponent, canActivate: [AuthGuard]},
  { path: 'exercicios/edit/:id', component: ExercicioEditComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: ListComponent, canActivate: [AuthGuard]},
  { path: 'usuarios/details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'alunos', component: DetailsComponent, canActivate: [AuthGuard]},
  { path: 'alunos/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/list', component: CreateEditComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/criar-editar', component: CreateEditComponent, canActivate: [AdminGuard] },
  { path: 'white-label', component: WhiteLabelComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }