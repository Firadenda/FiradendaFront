import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ApiCallService } from '../services/api-call/api-call.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { getProducts } from '../store/selectors';
import { loadProducts } from '../store/actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  public products$: Observable<Product[]>;

  constructor(
    private apiCallService: ApiCallService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(getProducts));
    this.store.dispatch(loadProducts());
  }

  addProduct() {}
  editProduct(id: number) {}

  deleteProduct(id: number) {
    this.apiCallService.deleteProduct(id).subscribe(() => {
      this.products$ = this.apiCallService.getProducts();
    });
  }
}
