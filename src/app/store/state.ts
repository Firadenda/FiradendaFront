import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../interfaces/product.interface';
import { Order } from '../interfaces/order.interface';

export interface AppState {
  products: EntityState<Product>;
  orders: Order[];
}

export const productAdapter = createEntityAdapter<Product>();

export const initialState: AppState = {
  products: productAdapter.getInitialState(),
  orders: [],
};
