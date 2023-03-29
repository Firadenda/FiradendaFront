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
      // Populate the form with the product's details if editing
      this.productForm.patchValue(product);
      this.modalTitle = 'Edit Product';
    } else {
      // Clear the form if adding a new product
      this.productForm.reset();
      this.modalTitle = 'Add Product';
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveProduct() {
    // If the form is invalid, don't submit it
    if (this.productForm.invalid) {
      return;
    }

    // Get the form values and convert to a Product object
    const product: Product = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      stock: this.productForm.value.stock,
    };

    // Call the API to add or edit the product
    if (product.id) {
      // Editing a product
      this.apiCallService.updateProduct(product).subscribe(() => {
        this.closeModal();
        this.products$ = this.apiCallService.getProducts();
      });
    } else {
      // Adding a new product
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
