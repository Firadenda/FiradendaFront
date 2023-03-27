import { Component, DoCheck, OnInit } from '@angular/core';
import { CartProduct } from '../interfaces/cart-product.interface';
import { CartService } from '../services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-resume',
  templateUrl: './order-resume.component.html',
  styleUrls: ['./order-resume.component.css'],
})
export class OrderResumeComponent implements OnInit, DoCheck {
  public cartProducts$: CartProduct[] = [];

  constructor(private router: Router, public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(
      (cartProducts) => (this.cartProducts$ = cartProducts)
    );
  }

  ngDoCheck(): void {
    if (this.cartProducts$.length === 0) {
      this.router.navigate(['/']);
    }
  }

  public getTotal(): number {
    return this.cartService.getTotal();
  }

  public confirmOrder(): void {
    this.cartService.confirmOrder();
  }
}
