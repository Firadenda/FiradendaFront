import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../services/api-call/api-call.service';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public productId: number;
  public products$: Observable<Product>;

  constructor(private route: ActivatedRoute) {}

  private readonly apiCallService = inject(ApiCallService);
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!;
    });

    this.products$ = this.apiCallService.getProductById(this.productId);
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
}
