import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.Product';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {
    listeProduits: Product[] = [];
    bar: Product = {};

    constructor(public productsService: ProductsService) { }

    getProducts(){
        this.productsService.getProductFromJson().subscribe((res: Product[]) => {
            console.log(res);
            this.listeProduits = res;
            // res.forEach( (product) => {
            //     // console.log(product);
            //     this.listeProduits.push(product);
            // })
            this.bar = this.getProduit(1);
        },
        (err) => {
            alert('failed to get data from json');
        }
    )};

    getProduit(id: number){
        let result: Product = {};
        // console.log(this.listeProduits[id]);
        this.listeProduits.forEach((product) => {
            if(product.id == id) result = product;
        });
        // return this.listeProduits[id];
        return result;
    }

    ngOnInit(): void {
        this.getProducts();
    }

}
