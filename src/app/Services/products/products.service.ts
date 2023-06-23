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
      'https://localhost:7118/api/Products/Sale'
    );
  }

  getAllProducts() {
    return this.myClient.get('https://localhost:7118/api/Products');
  }

  getProductsbyCategory(title:any){
    return this.myClient.get(`https://localhost:7118/CategoryByTitle?title=${title}`)
  }

  getProductDetails(id: any) {
    return this.myClient.get(`https://localhost:7118/api/Products/${id}`);
  }

  getproductsByCategory(id:any){
    return this.myClient.get(`https://ecommerceiti-heba.onrender.com/category/${id}/product`);
  }

  addtocart(data: CartItem) {
    return this.myClient.post(
      `https://localhost:7118/api/CartItems`,
      data
    );
  }

addtoWishlist(WId:any,PId:any){
  return this.myClient.post(`https://localhost:7118/WishListProduct/${WId}`,PId);
}

  addReview(data:any){
    return this.myClient.post(`https://ecommerceiti-heba.onrender.com/review`,data)
  }

  getReview(id:any){
    return this.myClient.get(`https://ecommerceiti-heba.onrender.com/product/review/${id}?limit=100`)
  }

  deleteReview(id:any){
    return this.myClient.delete(`https://ecommerceiti-heba.onrender.com/review/${id}`)
  }

}
