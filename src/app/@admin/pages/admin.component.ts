import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  toogledValue = true;
  toogled($event: boolean) {
    console.log('Admin ', $event);
    this.toogledValue = $event;
  }
}
