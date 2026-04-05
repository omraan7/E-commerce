export interface CartResponse {
  status: 'success' | 'error';
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}
interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// واجهة للفئة
interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}