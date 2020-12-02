import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { IMeData } from '@core/services/interfaces/sesion.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  session: IMeData = {
    status: false,
  };
  access = false;
  role: string;
  userLabel: string;

  constructor(private apiAuth: AuthService) {
    this.apiAuth.accessVariable$.subscribe((result) => {
      console.log(result.status);
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${this.session.user?.name} ${this.session.user?.lastname}`
    });
  }

  ngOnInit(): void {}

  logout() {
    this.apiAuth.resetSession();
    this.apiAuth.updateSession({status: false});
  }

}
