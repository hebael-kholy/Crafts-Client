import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isAuthenticated = false;

  constructor(private router: Router, private httpClient: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    this.isAuthenticated = true;
    return this.httpClient.post(
      'https://localhost:7118/api/Users/Login',
      obj
    );
  }

  createUser(user: any): Observable<any> {
    return this.httpClient.post(
      'https://localhost:7118/api/Users/Register',
      user
    );
  }

  logOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('mail');
    localStorage.removeItem('password');
    localStorage.removeItem('gender');
    localStorage.removeItem('image');
    localStorage.removeItem('user');

    localStorage.removeItem('email');
    localStorage.removeItem('cartitems');
    localStorage.removeItem('wishlistitems');
    this.router.navigate(['login']);
    // location.reload();
  }

  checkLoginStatus() {
    return localStorage.getItem('token');
  }

  resetPassword(data: any) {
    return this.httpClient.post(
      'https://localhost:7118/api/Users/Reset-Password',
      data
    );
  }

  veryfyCode(data: any) {
    return this.httpClient.post(
      'https://localhost:7118/api/ForgetPassword/VerifyPassword',
      data
    );
  }
  changePassword(data: any) {
    return this.httpClient.put(
      'https://localhost:7118/api/Users/NewPassword',
      data
    );
  }
  CreatWishlist(obj: any) {
    return this.httpClient.post('https://localhost:7118/api/WishLists', obj);
  }
  CreatCart(id: any) {
    return this.httpClient.post('https://localhost:7118/api/Carts', id);
  }
}
