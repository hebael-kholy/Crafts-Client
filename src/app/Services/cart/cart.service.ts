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
  removeitemfromcart(id:any){
    return this.myClient.delete(`https://localhost:7118/api/CartItems/${id}`);
  }
  clearCart(id:any){
    return this.myClient.delete(`https://localhost:7118/AllItems/${id}`);
  }
  applycoupon(id:any,id2:any){
    return this.myClient.get(`https://localhost:7118/Coupon?CartId=${id}&couponId=${id2}`)
  }
  UpdateQuantity(id:any, data:any){
    return this.myClient.put(`https://localhost:7118/api/CartItems/${id}`, data);
  }

  getCoupon(Name:any){
    return this.myClient.get(`https://localhost:7118/api/Coupons/${Name}`)
  }
  createOrder(data:any){
    return this.myClient.post(`https://localhost:7118/api/Orders`,data);
  }

  }



