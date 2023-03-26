import { Component, OnInit } from '@angular/core';
import { CartService } from "../services/cart/cart.service";
import { Product } from "../interfaces/product.interface";
import { ApiCallService } from "../services/api-call/api-call.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private productService: ApiCallService, private cartService: CartService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  public addToCart(product: Product): void {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    };
    this.cartService.addToCart(cartItem);
  }

  public trackByIndex(index: number, product: Product): number {
    return product.id;
  }
}


