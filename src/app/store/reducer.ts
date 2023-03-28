import { createReducer, on } from '@ngrx/store';
import { productAdapter, initialState } from './state';
import { loadProductsSuccess } from './actions';

export const productReducer = createReducer(
  initialState.products,
  on(loadProductsSuccess, (state, { products }) =>
    productAdapter.setAll(products, state)
  )
);
