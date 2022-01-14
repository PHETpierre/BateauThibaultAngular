import { Injectable } from '@angular/core';
import { Product } from '../../product.Product';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from "../../GlobalVariables";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient, private globalVar:GlobalVariables) { }

  getProductFromJson(){
      return this.http.get<Product[]>("../../../assets/products.json");
  }
  getProductFromPython(){
      // return this.http.get<Product[]>("http://127.0.0.1:8000/infoproducts/");
      return this.http.get<Product[]>(this.globalVar.urlDev+"/infoproducts/");
  }
}
