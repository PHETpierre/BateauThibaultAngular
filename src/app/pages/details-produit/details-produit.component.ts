import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.Product';
import { ProductsService } from '../../core/services/products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {
    listeProduits: Product[] = [];
    selectedProduit: Product = {};
    selectedId: number = 1;

    constructor(public productsService: ProductsService) { }

    getProducts(){
        this.productsService.getProducts().subscribe((res: Product[]) => {
            console.log(res);
            this.listeProduits = res;
            this.selectedProduit = this.getProduit(1);
        },
        (err) => {
             alert('failed to get data from json');
         })
    };

    getProduit(id: number){
        let result: Product = {};
        this.listeProduits.forEach((product) => {
            if(product.id == id) result = product;
        });
        return result;
    }

    ngOnInit(): void {
      this.getProducts();
    }

    updateId(){
        this.selectedProduit = this.getProduit(this.selectedId);
    }

    addProduct(){
      this.productsService.addProductStock(this.selectedProduit).subscribe((res: Product) => {
        this.getProducts();
      },
      (err) => {
          alert('failed to add data');
      })
    }

    removeProduct(){
      this.productsService.removeProductStock(this.selectedProduit).subscribe((res: Product) => {
        this.getProducts();
      },
      (err) => {
          alert('failed to add data');
      })
    }

    modifyPromotion(){
      this.productsService.putProductOnSale(this.selectedProduit).subscribe((res: Product) => {
        this.getProducts();
      },
      (err) => {
          alert('failed to add data');
      })
    }
}
