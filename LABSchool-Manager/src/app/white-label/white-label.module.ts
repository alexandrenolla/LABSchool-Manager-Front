import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteLabelComponent } from './components/white-label/white-label.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WhiteLabelComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    WhiteLabelComponent
  ]
})
export class WhiteLabelModule { }
