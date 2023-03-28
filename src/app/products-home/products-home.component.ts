import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../interfaces/product.interface';
import { ApiCallService } from '../services/api-call/api-call.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css'],
})
export class ProductsHomeComponent implements OnInit {
  public products$: Observable<Product[]>;
  public outOfStock$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private apiCallService: ApiCallService
  ) {}

  ngOnInit(): void {
    this.products$ = this.apiCallService.getProducts();

    this.outOfStock$ = this.products$.pipe(
      map((products) => {
        const outOfStockProducts = products.filter(
          (product) => product.stock <= 0
        );
        return outOfStockProducts.length === products.length;
      })
    );
  }

  public addToCart(product: Product): void {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      stock: product.stock,
    };
    this.cartService.addToCart(cartItem);
  }

  public trackByIndex(index: number, product: Product): number {
    return product.id;
  }
}
