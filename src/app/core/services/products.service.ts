import { Injectable } from '@angular/core';
import { Product } from '../../product.Product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProductFromJson(){
      return this.http.get<Product[]>("../../../assets/products.json");
  }
}
