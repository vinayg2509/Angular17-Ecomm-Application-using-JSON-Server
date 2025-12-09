import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  signInFormValue: any = {};
  user_data: any;

  constructor(
    private router: Router,
    private loginService: LoginSignupService
  ) {}

  onSubmitSignIn() {
  this.loginService
    .adminLogin(
      this.signInFormValue.userEmail,
      this.signInFormValue.userPassword
    )
    .subscribe(
      (data) => {
        this.user_data = data;

        if (this.user_data.length === 1) {
          if (this.user_data[0].role === 'admin') {
            sessionStorage.setItem('user_session_id', this.user_data[0].id);
            sessionStorage.setItem('role', this.user_data[0].role);
            this.router.navigateByUrl('/admin-dashboard');
          } else {
            alert('You are not an admin');
          }
        } else {
          alert('Invalid login details');
        }

        console.log(this.user_data);
      },
      (error) => {
        console.log('My error ', error);
      }
    );
}

}
