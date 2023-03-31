import { Component, inject, OnInit } from '@angular/core';
import { ProductsHomeComponent } from '../products-home/products-home.component';
import { ApiCallService } from '../services/api-call/api-call.service';
import { map, Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent extends ProductsHomeComponent implements OnInit {
  banniereProduct1: any = './assets/videos/test2.mp4';
  banniereProduct2: any = './assets/videos/bannieremonde.mp4';
  banniereProduct3: any = './assets/videos/bannierecasquette.mp4';
  public category$: Observable<Category[]>;
  public filteredProducts$: Observable<Product[]>;
  public activeCategory: Category | null = null;

  private readonly apiCallService = inject(ApiCallService);

  override ngOnInit() {
    this.category$ = this.apiCallService.getCategories();
    this.products$ = this.apiCallService.getProducts();
    this.filteredProducts$ = this.products$;
  }

  public filterProductsByCategory(category: Category) {
    if (this.activeCategory == category) {
      this.activeCategory = null;
      this.filteredProducts$ = this.apiCallService.getProducts();
    } else {
      this.activeCategory = category;
      this.filteredProducts$ = this.products$.pipe(
        map((products) =>
          products.filter((product) => product.category?.name === category.name)
        )
      );
    }
  }

  public resetFilter() {
    this.activeCategory = null;
    this.filteredProducts$ = this.products$;
  }
}
