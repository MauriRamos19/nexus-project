import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-company-store',
  templateUrl: './company-store.component.html',
  styleUrls: ['./company-store.component.scss']
})
export class CompanyStoreComponent implements OnInit {

  companyId:any;
  products:any = []
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.loadProducts()
  }

  loadProducts(){
    this.productService.getProductsByCompany(this.companyId).subscribe((res:any) => {
      this.products = res.products
    })
  }
}
