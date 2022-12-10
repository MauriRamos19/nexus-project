import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8888/api/entity/company/products"
  url2 = "http://localhost:8888/api/entity/user/company"
  url3 = "http://localhost:8888/api/entity/user/cart"


  getProducts(token: any) {
    const headers:any = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    })
    return this.http.get(this.url, {headers: headers})
  }

  getProductsByCompany(id: any) {
  
    return this.http.get(`${this.url2}/${id}/products`)
  }

  newProduct(data:any, token: any) {
    const headers:any = new HttpHeaders({
      'authorization': `Bearer ${token}`
    })
    return this.http.post(this.url,data,{headers: headers})
  }

  removeProduct(id:any, token:any) {
    const headers:any = new HttpHeaders({
      'authorization': `Bearer ${token}`
    })
    return this.http.delete(`${this.url}/${id}`,{headers: headers})
  }

  getProductDetails(id:any, productId:any) {
    return this.http.get(`${this.url2}/${id}/products/${productId}`)
  }

  addProductToCart(id:any, productId:any, token:any) {
    const headers:any = new HttpHeaders({
      'authorization': `Bearer ${token}`
    })
    return this.http.post(`${this.url2}/${id}/products/${productId}`, {}, {headers: headers})
  }

  getProductsByUser(token:any) {
    const headers:any = new HttpHeaders({
      'authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.url3}`, {headers: headers})
  }

  removeProductFromCart(id:any,token:any) {
    const headers:any = new HttpHeaders({
      'authorization': `Bearer ${token}`
    })
    return this.http.put(`${this.url3}/${id}`,{},{headers: headers})
  }

  
}
