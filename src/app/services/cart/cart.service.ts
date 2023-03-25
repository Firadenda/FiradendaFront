import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProduct } from "../../interfaces/cart-product.interface";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartProduct[]>([]);
  public cart$: Observable<CartProduct[]> = this.cartSubject.asObservable();

  constructor() { }

  public addToCart(product: CartProduct): void {
    const currentCart = this.cartSubject.getValue();
    const existingProductIndex = currentCart.findIndex(cartProduct => cartProduct.id === product.id);
    if (existingProductIndex > -1) {
      currentCart[existingProductIndex].quantity++;
      this.cartSubject.next(currentCart);
    } else {
      this.cartSubject.next([...currentCart, product]);
    }
  }

  public removeProduct(productId: number): void {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(product => product.id !== productId);
    this.cartSubject.next(updatedCart);
  }

  public clearCart(): void {
    this.cartSubject.next([]);
  }

  public getTotal(): number {
    return this.cartSubject.getValue().reduce((acc, product) => acc + product.price * product.quantity, 0);
  }
}
