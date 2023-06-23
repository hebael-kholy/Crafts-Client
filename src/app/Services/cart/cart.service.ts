import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../Components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public myClient: HttpClient) {}

  getCartitems(id:any) {
    return this.myClient.get(`https://localhost:7118/WithCartItems?id=${id}`);
  }

  removeitemfromcart(id1:any,id2:any){
    return this.myClient.delete(`https://ecommerceiti-heba.onrender.com/users/${id1}/cart/delete/${id2}`);
  }

  clearCart(id:any){
    return this.myClient.delete(`https://ecommerceiti-heba.onrender.com/users/${id}/cart/clear`);
  }

  UpdateQuantity(id:any, data:any){
    return this.myClient.put(`https://localhost:7118/api/CartItems/${id}`, data);
  }

  createOrder(id1:any,id2:any,data:Order){
    return this.myClient.post(`https://ecommerceiti-heba.onrender.com/order/${id1}/${id2}`,data);
  }
  applycoupon(id:any , data:any){
    return this.myClient.put(`https://ecommerceiti-heba.onrender.com/users/${id}/cart/applycoupon`,data)
  }

  }



