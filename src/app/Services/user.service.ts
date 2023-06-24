import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private myUser: HttpClient) {}
  baseUrl = 'https://craftsapp.azurewebsites.net/api/Users';
  updateUrl = 'https://craftsapp.azurewebsites.net/api/Users/update';
  imageUrl = 'https://craftsapp.azurewebsites.net/api/Users/image';

  getOneUser(id: any) {
    return this.myUser.get(`${this.baseUrl}/${id}`);
  }

  //update image
  updateUserImage(id: any, imageFile: any) {
    this.isUpdated = true;
    return this.myUser.put(`${this.imageUrl}/${id}`, imageFile);
  }

  isUpdated = false;
  //update user
  token = localStorage.getItem('token');
  updateUser(id: any, newUser: any) {
    const head = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    console.log('Bearer ' + this.token);
    console.log(this.token);
    console.log(head);
    this.isUpdated = true;


    return this.myUser.put(`${this.updateUrl}/${id}`, newUser, {headers: head});
  }

  //user orders
  orderUrl= "https://craftsapp.azurewebsites.net/api/Orders";
  deleteOrderUrl = "https://craftsapp.azurewebsites.net/order";
  getByStatus(id:any, status:any){
    return this.myUser.get(`${this.orderUrl}/${id}/${status}`);
  }
  getPending(id:any){
    return this.myUser.get(`${this.orderUrl}/${id}?status=pending`);
  }
  getReject(id:any){
    return this.myUser.get(`${this.orderUrl}/${id}?status=rejected`);
  }
  deleteOrder(id:any,body:any){
    return this.myUser.put(`${this.deleteOrderUrl}/${id}/cancle`,body);
  }
}


