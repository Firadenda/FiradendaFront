import { Component, OnInit } from '@angular/core';
import { CartService } from "../services/cart/cart.service";
import { CartProduct } from "../interfaces/cart-product.interface";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0%)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])
  ]
})
export class CartComponent implements OnInit {
  public cartProducts: CartProduct[] = [];

  constructor(public cartService: CartService) { }

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
