import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem, WihlistItem } from 'src/app/Components/product-details/product-details.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public myClient: HttpClient) {}

  getSalesProducts() {
    return this.myClient.get(
      'https://craftsapp.azurewebsites.net/api/Products/Sale'
    );
  }

  getAllProducts() {
    return this.myClient.get('https://craftsapp.azurewebsites.net/api/Products');
  }

  getProductsbyCategory(title:any){
    return this.myClient.get(`https://craftsapp.azurewebsites.net/CategoryByTitle?title=${title}`)
  }

  getProductDetails(id: any) {
    return this.myClient.get(`https://craftsapp.azurewebsites.net/api/Products/${id}`);
  }

  getproductsByCategory(id:any){
    return this.myClient.get(`https://craftsapp.azurewebsites.net/category/${id}/product`);
  }

  addtocart(data: CartItem) {
    return this.myClient.post(
      `https://craftsapp.azurewebsites.net/api/CartItems`,
      data
    );
  }

addtoWishlist(WId:any,PId:any){
  return this.myClient.post(`https://craftsapp.azurewebsites.net/WishListProduct/${WId}`,PId);
}

addReview(data:any){
  return this.myClient.post(`https://craftsapp.azurewebsites.net/api/Reviews`,data)

}

getReview(id:any){
  return this.myClient.get(`https://craftsapp.azurewebsites.net/api/Reviews/${id}`)
}
deleteReview(id:any){
  return this.myClient.delete(`https://craftsapp.azurewebsites.net/api/Reviews?id=${id}`)
}

}
