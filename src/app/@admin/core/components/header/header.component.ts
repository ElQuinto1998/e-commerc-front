import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toogledValue = true;
  @Output() toogleChange = new EventEmitter<boolean>();

  toggled() {
    if (this.toogledValue === undefined) {
      this.toogledValue = true;
    }
    this.toogledValue = !this.toogledValue;
    console.log(this.toogledValue);
    this.toogleChange.emit(this.toogledValue);
  }
}
