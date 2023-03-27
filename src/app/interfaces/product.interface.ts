export interface Product {
  id: number;
  name: string;
  price: number;
  category: {
    id: number;
    name: string;
  }
  description: string;
  image: string;
  stock: number;
}
