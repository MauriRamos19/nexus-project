import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token = window.localStorage.getItem('token') || null
  entity: any;
  faXmark = faXmark
  constructor(private router: Router, private userService: UserService, private productService: ProductService) {}
  showModal = false;
  cartProducts: any;


  ngOnInit(): void {
    if(this.token) {
      this.userService.getUser(this.token).subscribe(
        (data:any)=> {
          this.entity = data
          window.localStorage.setItem('STATE','true')
          if(this.entity?.roleType) {
            window.localStorage.setItem('ROLE',this.entity.roleType)
          }
          window.localStorage.setItem('ENTITY',this.entity.entitytype)

          if(this.entity.roleType === 'client') {
            this.productService.getProductsByUser(this.token).subscribe(res=> {
              this.cartProducts = res
            })
          }
        }
      )
    }
  }

  
  toggleModal(state:any){
    console.log(state)
    this.showModal = state
  }

  remove(id: any) {
    this.productService.removeProductFromCart(id,this.token).subscribe((res:any) => {
      alert(res.msg)
    })
  }
}
