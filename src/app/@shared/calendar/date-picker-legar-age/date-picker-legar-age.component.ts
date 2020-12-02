import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {} from 'protractor';

@Component({
  selector: 'app-date-picker-legar-age',
  templateUrl: './date-picker-legar-age.component.html',
  styleUrls: ['./date-picker-legar-age.component.scss'],
})
export class DatePickerLegarAgeComponent implements OnInit {
  CURRENT_DATE = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  minDate: NgbDateStruct = {
    year: this.CURRENT_DATE.year - 100,
    month: this.CURRENT_DATE.month,
    day: this.CURRENT_DATE.day,
  };
  maxDate: NgbDateStruct = {
    year: this.CURRENT_DATE.year - 18,
    month: this.CURRENT_DATE.month,
    day: this.CURRENT_DATE.day,
  };

  model: NgbDateStruct = this.maxDate;

  @Output() newDate = new EventEmitter<NgbDateStruct>();

  constructor() {}

  ngOnInit(): void {}

  selectDateChange() {
    this.newDate.emit(this.model);
  }
}
