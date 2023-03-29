import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ApiCallService } from '../services/api-call/api-call.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { getProducts } from '../store/selectors';
import { loadProducts } from '../store/actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../interfaces/category.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  public products$: Observable<Product[]>;
  public categories$: Observable<Category[]>;
  public productForm: FormGroup;
  public categoryForm: FormGroup;
  public modalTitle: string;
  public isModalOpen = false;
  public isCategoryModalOpen = false;

  constructor(
    private apiCallService: ApiCallService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(getProducts));
    this.store.dispatch(loadProducts());
    this.categories$ = this.apiCallService.getCategories();

    this.productForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });

    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
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

  openCategoryModal() {
    this.isCategoryModalOpen = true;
    this.categoryForm.reset();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeCategoryModal() {
    this.isCategoryModalOpen = false;
  }

  saveProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const product: Product = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      category: this.productForm.value.category.id,
      description: this.productForm.value.description,
      image:
        'https://lopinion.com/storage/articles/e1n9Iy3dHyc5bfi8aGaerEAic6tBrQpNDQjqrrUd.jpg',
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

  saveCategory() {
    if (this.categoryForm.invalid) {
      return;
    }

    const category: Category = {
      name: this.categoryForm.value.categoryName,
    };

    this.apiCallService.postCategory(category).subscribe(() => {
      this.closeCategoryModal();
      this.categories$ = this.apiCallService.getCategories();
    });
  }

  deleteProduct(id: number) {
    this.apiCallService.deleteProduct(id).subscribe(() => {
      this.products$ = this.apiCallService.getProducts();
    });
  }

  deleteCategory(id: number) {
    this.apiCallService.deleteCategory(id).subscribe(() => {
      this.categories$ = this.apiCallService.getCategories();
    });
  }
}
