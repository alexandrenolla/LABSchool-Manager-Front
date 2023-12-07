import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditComponent } from './components/create-edit/create-edit.component';

import { DetailsComponent } from './components/details/details.component';
import { CoreModule } from "../core/core.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@NgModule({
    declarations: [
        CreateEditComponent,
        DetailsComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxMaskDirective,
        NgxMaskPipe,
      
        
        
    ],
    
})
export class UsuariosModule { }
