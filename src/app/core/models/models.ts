export interface ProductsDTO {
  products: Product[]
}
export interface ICart {
  products: Product[],
  error: string | null
}
export interface Product {
  id: string;
  name: string;
  price: number;
  type: string;
  customerRating: number;
  image: string;
  description?: string;
  reviews?: Review[];
}

export interface Review {
  user: string;
  comment: string;
  rating: number;
}

export interface AppStateInterface {
  products: ICart;
}