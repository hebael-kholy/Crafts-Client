import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(public myClient: HttpClient) {}


  getWishlistitems(id:any) {
    return this.myClient.get(`https://craftsapp.azurewebsites.net/wishlist/${id}`);
  }

  getUserWishList(id:any){
    return this.myClient.get(`https://craftsapp.azurewebsites.net/api/WishLists/User?userId=${id}`);
  }

  removeitemfromWishlist(WId:any,PId:any){
    return this.myClient.delete(`https://craftsapp.azurewebsites.net/api/WishLists/${PId}/${WId}`);
  }



}
