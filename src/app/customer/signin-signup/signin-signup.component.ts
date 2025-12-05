import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { log } from 'node:console';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, RouterLink,HttpClientModule,ReactiveFormsModule,FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.scss',
})
export class SigninSignupComponent {
  regForm: boolean = false;
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  signUpSubmited = false;
  href: string = '';
  user_data: any;
  user_details!: User;
  user_reg_data: any;
  signInFormValue: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginSignupService
  ) {}

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
    }

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      role: ['', Validators.required],
      agreetc: ['', Validators.required],
    });
  }

  get rf() {
    return this.signUpForm.controls;
  }
  onSubmitSignUpForm() {
    this.signUpSubmited = true;
    if (this.signUpForm.invalid) {
      return;
    }

    this.user_reg_data = this.signUpForm.value;
    this.user_details = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addressLine1: this.user_reg_data.addLine1,
        addressLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      gender: this.user_reg_data.gender,
      aboutYou: this.user_reg_data.aboutYou,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
      agreetc: this.user_reg_data.agreetc,
    };
    this.loginService.userRegister(this.user_details).subscribe((data) => {
      alert('User Register Succesfull');
      this.router.navigateByUrl('/sign-in');
    });
  }

  onSubmitSignIn() {
    this.loginService
      .authLogin(this.signInFormValue.email, this.signInFormValue.password)
      .subscribe((data) => {
        this.user_data=data
        if(this.user_data.length==1)
        {
            if(this.user_data[0].role=='seller')
            {
              sessionStorage.setItem('user_session_id',this.user_data[0].id)
              sessionStorage.setItem('role',this.user_data[0].role)
              this.router.navigateByUrl('/seller-dashboard')
            }
            else if(this.user_data[0].role=='buyer')
            {
              sessionStorage.setItem('user_session_id',this.user_data[0].id)
              sessionStorage.setItem('role',this.user_data[0].role)
              this.router.navigateByUrl('/buyer-dashboard')
            }
           else if(this.user_data[0].role=='admin')
            {
              sessionStorage.setItem('user_session_id',this.user_data[0].id)
              sessionStorage.setItem('role',this.user_data[0].role)
              this.router.navigateByUrl('/admin-dashboard')
            }
            else
            {
              alert('Invalid login details')
            }
        }
        else
        {
          alert('Invalid')
        }
        console.log(this.user_data);
      },error=>{
        console.log("My error ",error);
        
      });
  }
}
