import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ApiCallService } from '../services/api-call/api-call.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public cartProductCount: number = 0;
  public commandCount: number = 0;

  constructor(
    private cartService: CartService,
    private apiCallService: ApiCallService
  ) {}

  ngOnInit() {
    this.apiCallService.getCommands().subscribe((commands) => {
      this.commandCount = commands.length;
    });

    this.cartService.cart$.subscribe((cartProducts) => {
      this.cartProductCount = cartProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
    });
  }

  public toggleCart() {
    this.cartService.toggleCart();
  }
}
