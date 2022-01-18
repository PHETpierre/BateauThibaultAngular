import { Injectable } from '@angular/core';
import { Product } from '../../product.Product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: String = "http://127.0.0.1:8000/";

  constructor(private http:HttpClient) { }

  getProductFromJson(){
      return this.http.get<Product[]>(this.url+"../../../assets/products.json");
  }

  getCrustaces(){
    return this.http.get<Product[]>(this.url+"infocrustaces/");
  }

  getPoissons(){
    return this.http.get<Product[]>(this.url+"infopoissons/");
  }

  getFruitsDeMer(){
    return this.http.get<Product[]>(this.url+"infofruitdemers/");
  }

  addProductStock(product:Product){
    return this.http.get<Product>(this.url+'incrementStock/'+product.id+'/'+((product.quantity)?product.quantity:0)+'/'+((Number.isInteger(product.price)) ? (product.price + ".0") : product.price));
  }

  removeProductStock(product:Product){
    return this.http.get<Product>(this.url+'decrementStock/'+product.id+'/'+((product.quantity)?product.quantity:0)+'/'+((Number.isInteger(product.price)) ? (product.price + ".0") : product.price));
  }

  putProductOnSale(product:Product){
    return this.http.get<Product>(this.url+'putonsale/'+product.id+'/'+'/'+product.discount);
  }

  getTransactions(){
    return this.http.get<Product[]>(this.url+"transaction/");
  }

}
