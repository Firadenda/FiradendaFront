import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title = 'Firadenda';

  private readonly cartService = inject(CartService);

  ngOnInit() {
    this.cartService.loadCartFromLocalStorage();
  }
}
