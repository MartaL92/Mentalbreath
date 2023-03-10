import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  userRole!: string;

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authSrv.user$.subscribe(
      (data) => {
        this.userRole = data?.user.role!
      });
  }

  onLogout() {
    this.authSrv.logout();
  }

}
