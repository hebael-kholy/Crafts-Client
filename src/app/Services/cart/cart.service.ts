import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../Components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public myClient: HttpClient) {}

  getCartitems(id:any) {
    return this.myClient.get(`https://craftsapp.azurewebsites.net/WithCartItems?id=${id}`);
  }
  removeitemfromcart(id:any){
    return this.myClient.delete(`https://craftsapp.azurewebsites.net/api/CartItems/${id}`);
  }
  clearCart(id:any){
    return this.myClient.delete(`https://craftsapp.azurewebsites.net/AllItems/${id}`);
  }
  applycoupon(id:any,id2:any){
    return this.myClient.get(`https://craftsapp.azurewebsites.net/Coupon?CartId=${id}&couponId=${id2}`)
  }
  UpdateQuantity(id:any, data:any){
    return this.myClient.put(`https://craftsapp.azurewebsites.net/api/CartItems/${id}`, data);
  }

  getCoupon(Name:any){
    return this.myClient.get(`https://craftsapp.azurewebsites.net/api/Coupons/${Name}`)
  }
  createOrder(data:any){
    return this.myClient.post(`https://craftsapp.azurewebsites.net/api/Orders`,data);
  }

  }



