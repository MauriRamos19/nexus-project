import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() token:any;
  @Input() entity: any;
  faCartShopping = faCartShopping
  constructor(private router: Router, private userService: UserService) {}
  @Output() cartModal = new EventEmitter()
  showModal = false
  
  ngOnInit(): void {
    if(this.token) {
      this.userService.getUser(this.token).subscribe(
        data=> {
          this.entity = data
          window.localStorage.setItem('STATE','true')
          if(this.entity?.roleType) {
            window.localStorage.setItem('ROLE',this.entity.roleType)
          }
          window.localStorage.setItem('ENTITY',this.entity.entitytype)
        }
      )
    }
  }

  toogleModal(){
    this.cartModal.emit(!this.showModal)
  }

  
  signOut(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('STATE');
    window.localStorage.removeItem('ROLE');
    window.localStorage.removeItem('ENTITY');
    window.location.reload()
  }

  
}
