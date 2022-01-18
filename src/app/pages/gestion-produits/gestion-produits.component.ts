import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.Product';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-gestion-produits',
  templateUrl: './gestion-produits.component.html',
  styleUrls: ['./gestion-produits.component.css']
})
export class GestionProduitsComponent implements OnInit {
  listeProduits: Product[] = [];
  listePoissons: Product[] = [];
  listeCrustaces: Product[] = [];
  listeFruitsDeMer: Product[] = [];

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
    this.getPoissons();
    this.getCrustaces();
    this.getFruistDeMer();
  }

  getPoissons() {
    this.productsService.getPoissons().subscribe((res: Product[]) => {
      this.listePoissons = res;
      console.log(this.listePoissons);
    },
      (err) => {
        alert('failed to get poissons data from server');
        console.log(err)
      });
  }

  getCrustaces() {
    this.productsService.getCrustaces().subscribe((res: Product[]) => {
      this.listeCrustaces = res;
      console.log(this.listeCrustaces);
    },
      (err) => {
        alert('failed to get crustaces data from server');
        console.log(err)
      });
  }

  getFruistDeMer(){
    this.productsService.getFruitsDeMer().subscribe((res: Product[]) => {
      this.listeFruitsDeMer = res;
      console.log(this.listeFruitsDeMer);
    },
      (err) => {
        alert('failed to get fruits de mer data from server');
        console.log(err)
      });
  }

  addProductStock() {
    this.listeCrustaces = this.addProductStockByArray(this.listeCrustaces);
    this.listeFruitsDeMer = this.addProductStockByArray(this.listeFruitsDeMer);
    this.listePoissons = this.addProductStockByArray(this.listePoissons);
  }

  addProductStockByArray(products:Product[]){
    let result:Product[] = [];
    products.forEach((product) => {
      console.log("type of price", typeof product.price)

      if (typeof product.quantity != "number"){
        product.quantity = 0;
      }

      if (typeof product.discount != "number"){
        product.discount = 0;
      }

      if (product.quantity > 0){
        this.productsService.addProductStock(product).subscribe((data) => {
          result.push(data);
          console.log("one product => ",product)
        })
      }
      else if (product.quantity < 0) {
        product.quantity = product.quantity * -1;
        this.productsService.removeProductStock(product).subscribe((data) => {
          result.push(data);
        })
      }
      else {
        result.push(product);
      }

      if (product.discount != 0){
        this.productsService.putProductOnSale(product).subscribe((data) => {
          result.push(data);
        })
      }
      else {
        result.push(product);
      }

    })
    console.log("products result=> ",result)
    return result;
  }

}
