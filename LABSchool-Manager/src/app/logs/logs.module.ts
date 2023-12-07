import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './components/logs/logs.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class LogsModule { }
