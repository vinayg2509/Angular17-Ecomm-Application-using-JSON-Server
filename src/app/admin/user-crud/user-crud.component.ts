import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
declare var JQuery: any;
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss',
})
export class UserCrudComponent implements OnInit {
  all_user_data: any;
  single_user_data: any;
  addEditUserForm!: FormGroup;
  user_details: any;
  user_reg_data: any;
  edit_user_data: any;
  edit_user_id:any;
  upload_file_name!: string;
  addEdituser: boolean = false;
  edit_user: boolean = false;
  add_user: boolean = false;
  popup_header: any;
  signInFormValue: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
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

  getAllUser() {
    this.adminService.allUsers().subscribe(
      (data) => {
        this.all_user_data = data;
      },
      (error) => {
        console.log('My Error', error);
      }
    );
  }
  get rf() {
    return this.addEditUserForm.controls;
  }

  addUserPop() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = 'Add New User';
    this.addEditUserForm.reset();
  }
  addUser() {
    this.add_user = true;
    if (this.addEditUserForm.invalid) {
     alert('Error 😳\n\n' + JSON.stringify(this.addEditUserForm.value));

      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_details = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addressLine1: this.user_reg_data.addressLine1,
        addressLine2: this.user_reg_data.addressLine2,
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
    this.adminService.addUser(this.user_details).subscribe(
      (data) => {
        this.getAllUser();
       JQuery('#addEdituserModal').modal('toggle');

      },
      (error) => {
        console.log('My error', error);
      }
    );
  }

  editUserPop(user_id: any) {
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = 'Edit User';
    this.adminService.getSingleUser(user_id).subscribe(
      (data) => {
        this.single_user_data = data;
        this.upload_file_name = this.single_user_data.uploadPhoto;
        this.addEditUserForm.setValue({
          name: this.single_user_data.name,
          mobNumber: this.single_user_data.mobNumber,
          age: this.single_user_data.age,
          dob: this.single_user_data.dob,
          email: this.single_user_data.email,
          password: this.single_user_data.password,
          address: {
            id: 0,
            addressLine1: this.single_user_data.addressLine1,
            addressLine2: this.single_user_data.addressLine2,
            city: this.single_user_data.city,
            state: this.single_user_data.state,
            zipCode: this.single_user_data.zipCode,
          },
          language: this.single_user_data.language,
          gender: this.single_user_data.gender,
          aboutYou: this.single_user_data.aboutYou,
          uploadPhoto: '',
          role: this.single_user_data.role,
          agreetc: this.single_user_data.agreetc,
        });
      },
      (error) => {
        console.log('My Error', error);
      }
    );
  }

  updateUser() {
    this.add_user = true;
    if (this.addEditUserForm.invalid) {
      alert('Error 😳\n\n' + JSON.stringify(this.addEditUserForm.value));

      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_details = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addressLine1: this.user_reg_data.addressLine1,
        addressLine2: this.user_reg_data.addressLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      gender: this.user_reg_data.gender,
      aboutYou: this.user_reg_data.aboutYou,
      uploadPhoto:
        this.user_reg_data.uploadPhoto == ''
          ? this.upload_file_name
          : this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
      agreetc: this.user_reg_data.agreetc,
    };
    this.adminService.editUser(this.edit_user_id,this.user_details).subscribe(
      (data) => {
        this.getAllUser();
        JQuery('#addEdituserModal').modal('toggle');

      },
      (error) => {
        console.log('My error', error);
      }
    );
  }

  deleteUser(user_id: any) {
    this.adminService.deleteUser(user_id).subscribe(
      (data) => {
        this.getAllUser();
      },
      (error) => {
        console.log('My Error', error);
      }
    );
  }
}
