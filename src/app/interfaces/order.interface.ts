import { Product } from './product.interface';
import { CreditCard } from './credit-card.interface';

export interface Order {
  id?: number;
  items: {
    id?: number;
    item: Product;
    number: number;
  }[];
  total: number;
  credit: CreditCard[];
  firstName: string;
  lastName: string;
  address: string;
}
