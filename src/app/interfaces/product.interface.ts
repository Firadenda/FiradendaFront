import { Category } from './category.interface';

export interface Product {
  id: number;
  name: string;
  price: number;
  category?: Category[];
  description?: string;
  image?: string;
  stock: number;
}
