import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent, UserTypePipe } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    UserTypePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
   
    

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    RouterModule
  ]
})
export class CoreModule { }
