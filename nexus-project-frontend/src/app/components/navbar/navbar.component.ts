import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  token = window.localStorage.getItem('token') || null
  entity: any;
  constructor(private router: Router, private userService: UserService) {}

  
  
  ngOnInit(): void {
    if(this.token) {
      this.userService.getUser(this.token).subscribe(
        data=> {
          this.entity = data
        }
      )
    }
  }

  
  signOut(){
    window.localStorage.removeItem('token');
    window.location.reload()
  }

  
}
