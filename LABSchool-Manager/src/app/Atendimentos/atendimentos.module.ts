import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AtendimentosModule { }
