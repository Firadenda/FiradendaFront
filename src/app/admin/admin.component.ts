import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ApiCallService } from '../services/api-call/api-call.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { getProducts } from '../store/selectors';
import { loadProducts } from '../store/actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  public products$: Observable<Product[]>;
  public productForm: FormGroup;
  public modalTitle: string;
  public isModalOpen = false;

  constructor(
    private apiCallService: ApiCallService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(getProducts));
    this.store.dispatch(loadProducts());

    this.productForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  openModal(product: Product | null) {
    this.isModalOpen = true;

    if (product) {
      this.productForm.patchValue(product);
      this.modalTitle = 'Edit Product';
    } else {
      this.productForm.reset();
      this.modalTitle = 'Add Product';
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const product: Product = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      stock: this.productForm.value.stock,
    };

    if (product.id) {
      this.apiCallService.updateProduct(product).subscribe(() => {
        this.closeModal();
        this.products$ = this.apiCallService.getProducts();
      });
    } else {
      this.apiCallService.postProduct(product).subscribe(() => {
        this.closeModal();
        this.products$ = this.apiCallService.getProducts();
      });
    }
  }

  deleteProduct(id: number) {
    this.apiCallService.deleteProduct(id).subscribe(() => {
      this.products$ = this.apiCallService.getProducts();
    });
  }
}
