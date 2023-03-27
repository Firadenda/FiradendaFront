import { Product } from './product.interface';

export interface Order {
  id?: number;
  items: Product[];
  total: number;
  address: string;
}
