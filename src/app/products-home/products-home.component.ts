import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../interfaces/product.interface';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state';
import { loadProducts } from '../store/actions';
import { getProducts } from '../store/selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css'],
})
export class ProductsHomeComponent implements OnInit {
  public products$: Observable<Product[]>;
  public topProducts$: Observable<Product[]>;

  constructor(
    private cartService: CartService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(getProducts));
    this.store.dispatch(loadProducts());
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
  public productDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  public trackByIndex(index: number, product: Product): number {
    return product.id;
  }
}
