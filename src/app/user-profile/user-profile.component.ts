import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { User } from '../core/Model/object-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit{
  userProfileForm!: FormGroup;
  userProfile:boolean=false
  user_data:any
  user_update_data!:any
  user_details!: User;
  user_id!: any;
  user_profile_pic!:any
  user_languege:any
  user_role:any

  constructor(private userService: UserService,private router:Router,private formBuilder:FormBuilder) {}
  ngOnInit(): void {
    this.user_id=Number(sessionStorage.getItem('user_session_id'))
    this.userProfileForm=this.formBuilder.group({
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
    })
    this.editUserData(this.user_id)
  }
  get rf()
  {
    return this.userProfileForm.controls;
  }
  editUserData(user_id: any) {
    this.userService.getUserData(this.user_id).subscribe(data=>{
      this.user_data=data;
      this.user_profile_pic=this.user_data.uploadPic
      this.user_languege=this.user_data.language
      this.user_role=this.user_data.role
      this.userProfileForm.setValue({
         name: this.user_data.name,
      mobNumber: this.user_data.mobNumber,
      age: this.user_data.age,
      dob: this.user_data.dob,
      email: this.user_data.email,
      password: this.user_data.password,
      address: {
        addressLine1: this.user_data.address.addressLine1,
        addressLine2: this.user_data.address.addressLine2,
        city: this.user_data.address.city,
        state: this.user_data.address.state, 
        zipCode: this.user_data.address.zipCode,
      },
    
      gender: this.user_data.gender,
      aboutYou: this.user_data.aboutYou,
   
      agreetc: this.user_data.agreetc,
      })
    },error=>{
      console.log("My Error",error);
      
    })
  }


  updateUserData()
  {
    this.userProfile=true;
    if(this.userProfileForm.invalid)return

    this.user_update_data=this.userProfileForm.value
    this.user_details={
       name: this.user_update_data.name,
      mobNumber: this.user_update_data.mobNumber,
      age: this.user_update_data.age,
      dob: this.user_update_data.dob,
      email: this.user_update_data.email,
      password: this.user_update_data.password,
      address: {
        id:0,
        addressLine1: this.user_update_data.addressLine1,
        addressLine2: this.user_update_data.addressLine2,
        city: this.user_update_data.city,
        state: this.user_update_data.state,
        zipCode: this.user_update_data.zipCode,
        
      },
      language: this.user_update_data.language,
      gender: this.user_update_data.gender,
      aboutYou: this.user_update_data.aboutYou,
      uploadPhoto: this.user_update_data.uploadPhoto ? this.user_profile_pic:this.user_update_data.uploadPhoto,
      role: this.user_update_data.role,
      agreetc: this.user_update_data.agreetc,
    }
    this.userService.updateUserData(this.user_id,this.user_details).subscribe(data=>{
      alert("Profile Updated Succesfully")
      if(this.user_role=='admin')
        this.router.navigateByUrl('admin/dashboard')
      else if (this.user_role=='buyer')
        this.router.navigateByUrl('buyer/dashboard')
      else if(this.user_role=='seller')
        this.router.navigateByUrl('seller/dashboard')
    },error=>{
      console.log("My Error",error);
      
    })

  }
}
