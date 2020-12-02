import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerLegarAgeComponent } from './date-picker-legar-age.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatePickerLegarAgeComponent],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule
  ],
  exports: [DatePickerLegarAgeComponent]
})
export class DatePickerLegarAgeModule { }
