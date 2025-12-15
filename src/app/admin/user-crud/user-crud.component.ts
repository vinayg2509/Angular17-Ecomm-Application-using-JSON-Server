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

declare var $: any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss',
})
export class UserCrudComponent implements OnInit {
  all_user_data: any[] = [];
  single_user_data: any;
  addEditUserForm!: FormGroup;

  edit_user_id: number | null = null;
  upload_file_name: string = '';

  edit_user = false;
  add_user = false;
  popup_header = '';

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],

      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: [''],
      uploadPhoto: [''],
      role: ['', Validators.required],
      agreetc: [false, Validators.requiredTrue],
    });
  }

  getAllUser() {
    this.adminService.allUsers().subscribe({
      next: (data) => (this.all_user_data = data),
      error: (err) => console.log('Error:', err),
    });
  }

  addUserPop() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = 'Add New User';
    this.edit_user_id = null;
    this.addEditUserForm.reset();
  }

  addUser() {
    if (this.addEditUserForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const form = this.addEditUserForm.value;

    const payload = {
      name: form.name,
      mobNumber: form.mobNumber,
      age: form.age,
      dob: form.dob,
      email: form.email,
      password: form.password,
      address: {
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
      },
      language: form.language,
      gender: form.gender,
      aboutYou: form.aboutYou,
      uploadPhoto: form.uploadPhoto,
      role: form.role,
      agreetc: form.agreetc,
    };

    this.adminService.addUser(payload).subscribe({
      next: () => {
        this.addEditUserForm.reset();
        this.getAllUser();
        $('#addEditUserModal').modal('hide');
      },
      error: (err) => console.log('Add Error:', err),
    });
  }

  editUserPop(user_id: number) {
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = 'Edit User';
    this.edit_user_id = user_id;

    this.adminService.getSingleUser(user_id).subscribe({
      next: (data) => {
        this.single_user_data = data;
        this.upload_file_name = data.uploadPhoto;

        this.addEditUserForm.patchValue({
          name: data.name,
          mobNumber: data.mobNumber,
          age: data.age,
          dob: data.dob,
          email: data.email,
          password: data.password,

          addressLine1: data.address?.addressLine1,
          addressLine2: data.address?.addressLine2,
          city: data.address?.city,
          state: data.address?.state,
          zipCode: data.address?.zipCode,

          language: data.language,
          gender: data.gender,
          aboutYou: data.aboutYou,
          uploadPhoto: '',
          role: data.role,
          agreetc: data.agreetc,
        });
      },
      error: (err) => console.log('Fetch Error:', err),
    });
  }

  updateUser() {
    if (this.addEditUserForm.invalid || this.edit_user_id === null) {
      alert('Invalid form or missing user ID');
      return;
    }

    const form = this.addEditUserForm.value;

    const payload = {
      name: form.name,
      mobNumber: form.mobNumber,
      age: form.age,
      dob: form.dob,
      email: form.email,
      password: form.password,
      address: {
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
      },
      language: form.language,
      gender: form.gender,
      aboutYou: form.aboutYou,
      uploadPhoto: form.uploadPhoto || this.upload_file_name,
      role: form.role,
      agreetc: form.agreetc,
    };

    this.adminService.editUser(this.edit_user_id, payload).subscribe({
      next: () => {
        this.addEditUserForm.reset();
        this.getAllUser();
        $('#addEditUserModal').modal('hide');
      },
      error: (err) => console.log('Update Error:', err),
    });
  }

  deleteUser(user_id: number) {
    this.adminService.deleteUser(user_id).subscribe({
      next: () => this.getAllUser(),
      error: (err) => console.log('Delete Error:', err),
    });
  }
}
