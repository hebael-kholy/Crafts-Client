import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { ProductsService } from 'src/app/Services/products/products.service';

import Swal from 'sweetalert2';
import {
  CartItem,
  ProductDetailsComponent,
} from '../product-details/product-details.component';

export class Coupon {
  CartId!: number;
  couponId!: number;
}

export class Order {
  userId!: string;
  cartId!: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: any[] = [];
  product: any;
  productId: number = 0;
  totalPrice: any;

  itemId: any;
  productTitle: any;
  data2: any;
  value: any;
  cartId: any;
  cartitems: any;
  coupon_discount: number = 0;
  isloading = true;
  coupon_value = '';
  coupon_valueAdded = '';
  totalAfterDiscount: number = 0;
  newdisc: any;
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user).user.id;
  Tax: any;
  response: any;

  constructor(
    public route: ActivatedRoute,
    public myService: CartService,
    public wishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this.myService.getCartitems(this.userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isloading = false;
        this.data2 = res;
        this.response = res;
        localStorage.setItem('orderCartItemss', JSON.stringify(this.response));

        this.items = res.cartItems;
        localStorage.setItem('orderCartItems', JSON.stringify(res.cartItems));

        console.log(this.items);
        this.cartId = res.id;
        console.log(`this is cart id ${this.cartId}`);
        localStorage.setItem('cartId', this.cartId);
        localStorage.setItem('cart', JSON.stringify(res));

        this.totalPrice = res.totalPrice;
        this.Tax = this.totalPrice * 0.1;
        this.totalAfterDiscount = this.totalPrice;
        this.newdisc = 0;
        console.log(this.totalPrice);
      },

      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getCartTotal() {
    this.myService.getCartitems(this.userId).subscribe((res: any) => {
      console.log(res);
      this.totalPrice = res.totalPrice;
      this.totalAfterDiscount = res.totalPriceAfterDiscount;
    });
  }

  removeitem(item: any) {
    this.itemId = item.id;

    console.log(`this id for item ${this.itemId}`);
    console.log(`this id for user ${this.userId}`);
    this.myService.removeitemfromcart(this.itemId).subscribe((res) => {
      this.items.splice(this.items.indexOf(item), 1);
      this.totalPrice = this.data2.totalCarPrice;
      this.getCartTotal();
      this.cartitems = Number(localStorage.getItem('cartitems'));
      this.cartitems -= 1;
      this.Tax = 0;

      localStorage.setItem('cartitems', this.cartitems);
    });
  }

  clearcart() {
    console.log(`this id for user ${this.cartId}`);
    this.myService.clearCart(this.cartId).subscribe((res) => {
      console.log(res);
      this.items = [];
      this.cartitems = localStorage.getItem('cartitems');
      this.cartitems = 0;
      localStorage.setItem('cartitems', this.cartitems);
      this.getCartTotal();
    });
  }

  updateItemQuantity(item: any) {
    this.itemId = item.id;
    let updateditem: any = {
      quantity: this.value,
    };
    this.value = item.quantity;
    console.log(updateditem);
    console.log(`this id for item ${this.itemId}`);
    console.log(`this id for user ${this.userId}`);
    this.myService.UpdateQuantity(this.itemId, updateditem).subscribe((res) => {
      console.log(res);
      this.getCartTotal();
    });
  }

  AddOrder() {
    console.log(`this is userid ${this.userId}`);

    let order: Order = {
      userId: this.userId,
      cartId: this.cartId,
    };
    console.log(order);

    this.myService.createOrder(order).subscribe((res) => {
      console.log(res);
    });
    this.items = [];
    this.cartitems = localStorage.getItem('cartitems');
    this.cartitems = 0;
    localStorage.setItem('cartitems', this.cartitems);
    Swal.fire('Your order has been Checkout', '', 'success');
    this.clearcart();
    this.getCartTotal();
    //this.totalPrice=0;
    //this.totalAfterDiscount=0;
    this.Tax = 0;
  }

  apply() {
    console.log(this.coupon_valueAdded);
    if (this.coupon_valueAdded == '') {
      Swal.fire('Please Enter a valid Coupon', '', 'error');
      return;
    }
    console.log(this.coupon_valueAdded);
    this.myService.getCoupon(this.coupon_valueAdded).subscribe({
      next: (res: any) => {
        console.log(res);
        let coupon: Coupon = {
          CartId: this.cartId,
          couponId: res.id,
        };
        this.myService.applycoupon(coupon.CartId, coupon.couponId).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire('You got the Discount', '', 'success');
            this.getCartTotal();
          },
        });

        console.log(coupon.couponId);
        this.myService.getCoupon(coupon.couponId).subscribe({
          next: (res: any) => {
            console.log(res);
            this.coupon_discount = res.discount;
            this.coupon_value = res.name;
          },
          /////
        });
      },
      error: (err) => {
        Swal.fire('Please Enter a valid Coupon', '', 'error');
      },
    });
  }
}
