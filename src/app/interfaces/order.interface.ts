import { Product } from './product.interface';

export interface Order {
  id?: number;
  products: Product[];
  total: number;
  address: string;
}
