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

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts;
  }

  getProducts(){
    this.productsService.getProductFromJson().subscribe((res: Product[]) => {
        console.log(res);
        this.listeProduits = res;
    },
    (err) => {
        alert('failed to get data from json');
        console.log(err)
    }
)};

}
