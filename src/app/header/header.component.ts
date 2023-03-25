import { Component } from '@angular/core';
import { CartService } from "../services/cart/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public cartProductCount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cartProducts => {
      this.cartProductCount = cartProducts.reduce((acc, product) => acc + product.quantity, 0);
    });
  }

}
