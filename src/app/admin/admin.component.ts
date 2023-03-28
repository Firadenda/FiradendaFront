import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ApiCallService } from '../services/api-call/api-call.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  products$: Observable<Product[]> = new Observable<Product[]>();

  constructor(private apiCallService: ApiCallService) {}

  ngOnInit(): void {
    this.products$ = this.apiCallService.getProducts();
  }

  deleteProduct(id: number) {
    this.apiCallService.deleteProduct(id).subscribe(() => {
      this.products$ = this.apiCallService.getProducts();
    });
  }
}
