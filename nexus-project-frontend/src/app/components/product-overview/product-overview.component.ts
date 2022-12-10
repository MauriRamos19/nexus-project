import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  companyId:any;
  productId:any;
  product:any;
  token = window.localStorage.getItem('token') || null

  constructor(private route: ActivatedRoute,
              private productService: ProductService             
  ) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.productService.getProductDetails(this.companyId,this.productId).subscribe(res => {
      this.product = res;
    })
    
  }

  addToCart(){
    this.productService.addProductToCart(this.companyId, this.productId,this.token).subscribe((res:any) => {
      alert(res.msg)
    })
  }


  
  

}
