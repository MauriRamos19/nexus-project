import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  token = window.localStorage.getItem('token') || null
  products: any
  showModal = false;
  file:any;
  
  
  
  constructor(private productService: ProductService,
    private fb: FormBuilder,        
  ) { }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadProducts()
  }


  loadProducts(){
    this.productService.getProducts(this.token).subscribe((res:any) => {
      this.products = res.products
    })
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  newProduct(form: FormGroup){
    
    const formData = new FormData();
    formData.append("name",form.value.name)
    formData.append("description",form.value.description)
    formData.append("img",form.value.img)
    formData.append("price",form.value.price)
    
    this.productService.newProduct(formData, this.token).subscribe(res => {
      this.loadProducts()
    })
    this.toggleModal()
  }

  deleteProduct(id: any){
    this.productService.removeProduct(id,this.token).subscribe(res=>{
      console.log(res)
      this.loadProducts()
    })
    
  }

  onChangeProductImage(e:any){
    this.productForm.get('img')!.setValue(e.target.files[0]);
  } 
}
