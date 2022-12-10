import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  faTrashCan = faTrashCan
  @Input() product: any
  @Output() removeProduct = new EventEmitter();
  token = window.localStorage.getItem('token') || null
  

  constructor(private productService: ProductService, private router: Router) { }
  entity:any

  ngOnInit(): void {
    this.entity = localStorage.getItem('ENTITY');
  }


  remove(productId:any){
    this.removeProduct.emit(productId);
  }


  

}
