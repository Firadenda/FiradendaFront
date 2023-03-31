import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ApiCallService } from '../services/api-call/api-call.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public cartProductCount: number = 0;
  public commandCount$: Observable<number>;

  constructor(
    private cartService: CartService,
    private apiCallService: ApiCallService
  ) {}

  ngOnInit() {
    this.apiCallService.newOrderAdded.subscribe(() => {
      this.commandCount$ = this.apiCallService
        .getCommands()
        .pipe(map((orders) => orders.length));
    });

    this.commandCount$ = this.apiCallService
      .getCommands()
      .pipe(map((commands) => commands.length));

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
