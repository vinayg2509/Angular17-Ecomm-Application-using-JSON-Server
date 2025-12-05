import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  logged_in:boolean=false
  user_role!:any

  constructor(private router:Router){}
  ngOnInit(): void {
    
  }
  ngDoCheck()
  {
    this.user_role=sessionStorage.getItem('role')
    const session_id=sessionStorage.getItem('user_session_id')
    if(session_id)
    {
      this.logged_in=true
    }
  }
  logout()
  {
    sessionStorage.removeItem("role")
    sessionStorage.removeItem("user_session_id")
    this.router.navigateByUrl('/sign-in')
    location.reload()
  }

}
