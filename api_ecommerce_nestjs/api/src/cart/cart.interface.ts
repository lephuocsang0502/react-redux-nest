import { Product } from "src/product/models/product.interface";
import { User } from "src/user/models/user.interface";

  
export interface Item {
    product: Product
    orderQuantity: number
    extendedCost: number
  }

  export interface Cart {
    id:number
    user:User;
    cartItems:Item[];
    createdAt:Date;
  }