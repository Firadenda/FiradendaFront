import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProduct } from '../../interfaces/cart-product.interface';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call/api-call.service';
import { Order } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public isVisible = false;
  private cartSubject = new BehaviorSubject<CartProduct[]>([]);
  public cart$: Observable<CartProduct[]> = this.cartSubject.asObservable();

  constructor(private router: Router, private apiCallService: ApiCallService) {}

  public addToCart(product: CartProduct): void {
    const currentCart = this.cartSubject.getValue();
    const existingProductIndex = currentCart.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );
    if (existingProductIndex > -1) {
      currentCart[existingProductIndex].quantity++;
      this.cartSubject.next(currentCart);
    } else {
      this.cartSubject.next([...currentCart, product]);
      if (currentCart.length === 0) {
        this.isVisible = true;
      }
    }
  }

  public removeProduct(productId: number): void {
    const currentCart = this.cartSubject.getValue();
    const index = currentCart.findIndex((product) => product.id === productId);

    if (index !== -1) {
      if (currentCart[index].quantity > 1) {
        currentCart[index].quantity--;
      } else {
        currentCart.splice(index, 1);
      }
      this.cartSubject.next([...currentCart]);
    }
  }

  public clearCart(): void {
    this.cartSubject.next([]);
  }

  public getTotal(): number {
    return this.cartSubject
      .getValue()
      .reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  public toggleCart() {
    this.isVisible = !this.isVisible;
  }

  public processOrder(): void {
    this.router.navigate(['/order-resume']);
    this.isVisible = false;
  }

  public confirmOrder() {
    const order: Order = {
      products: this.cartSubject.getValue().map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        };
      }),
      total: this.getTotal(),
      address: '19 rue Lucien Faure, Bordeaux',
    };

    this.apiCallService.postOrder(order).subscribe(() => {
      this.clearCart();
      console.log('Order placed successfully!');
    });
  }
}
