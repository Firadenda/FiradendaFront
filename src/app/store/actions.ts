import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';
import { Order } from '../interfaces/order.interface';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const addOrder = createAction(
  '[Orders] Add Order',
  props<{ order: Order }>()
);

export const addOrderSuccess = createAction(
  '[Orders] Add Order Success',
  props<{ order: Order }>()
);
