import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.setMessage();
  }

  ngOnInit(): void {}

  login() {
    this.message = 'Trying to login...';

    this.authService.login().subscribe(() => {
      this.setMessage();

      if (this.authService.isLoggedIn) {
        const redirectUrl = '/admin';

        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.setMessage();
  }

  setMessage(): void {
    this.message = `Logged ${
      this.authService.isLoggedIn ? 'in' : 'out'
    }`;
  }
}
