import { createSelector } from '@ngrx/store';
import { AppState, productAdapter } from './state';

const { selectAll: selectAllProducts } = productAdapter.getSelectors();

export const getProducts = createSelector(
  (state: AppState) => state.products,
  selectAllProducts
);
