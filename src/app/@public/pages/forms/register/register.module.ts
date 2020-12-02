import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { DatePickerLegarAgeModule } from '@shared/calendar/date-picker-legar-age/date-picker-legar-age.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    DatePickerLegarAgeModule,
    FormsModule
  ]
})
export class RegisterModule { }
