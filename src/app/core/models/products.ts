export interface Product {
  id: string;
  name: string;
  description: string;
  color: string;
  pictureUrl: string;
  price: number;
  createdDate: string;
  categoryId: string;
  categoryName: string;
}
export interface Category {
  id: string;
  name: string;
}
export interface Owner {
  userId: string;
  userName: string;
}
