export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
  features?: string[];
  inStock: boolean;
  discountPercentage?: number;
  tags?: string[];
}