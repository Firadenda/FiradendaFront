import { Component, OnInit } from '@angular/core';
import { CartService } from "../services/cart/cart.service";
import { CartProduct } from "../interfaces/cart-product.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartProducts: CartProduct[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cartProducts => this.cartProducts = cartProducts);
  }

  public removeProduct(id: number): void {
    this.cartService.removeProduct(id);
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  public getTotal(): any{
    this.cartService.getTotal();
  }
}
